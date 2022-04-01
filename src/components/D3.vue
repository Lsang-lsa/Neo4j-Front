<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-container>
          <el-header>
            <el-row>
              <el-col :span="8" :offset="6"
                ><el-input v-model="searchStr" placeholder="姓名"></el-input
              ></el-col>
              <el-col :span="4"
                ><el-button type="plain" @click="searchName"
                  >搜索</el-button
                ></el-col
              >
            </el-row>
          </el-header>
          <el-main><div id="graph" class="graph"></div></el-main>
        </el-container>
      </el-col>
      <el-col :span="6" style="height: 100%">
        <detail-panel ref="detailPanel"></detail-panel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { ForceGraph } from "@/api/d3_tool";
import { findRelatedActor, findAllActor } from "@/api/d3_util";
import * as d3 from "d3";
import DetailPanel from "./DetailPanel.vue";

export default {
  components: { DetailPanel },
  data() {
    return {
      components: {
        DetailPanel,
      },
      graphData: {
        nodes: [],
        links: [],
      },
      searchStr: "", // 搜索内容
    };
  },

  mounted() {
    findAllActor().then((res) => {
      this.graphData.nodes = res;
      this.graphData.nodes.forEach((currentNode) => {
        // 上下级关系获取
        if (currentNode.subordinateOut.length !== 0) {
          currentNode.subordinateOut.forEach((currentNode2) => {
            this.graphData.links.push({
              source: currentNode.id,
              target: currentNode2.id,
              text: "上下级",
              value: 1,
            });
          });
        }
        // 主仆关系获取
        if (currentNode.servantOut.length !== 0) {
          currentNode.servantOut.forEach((currentNode2) => {
            this.graphData.links.push({
              source: currentNode.id,
              target: currentNode2.id,
              text: "主仆",
              value: 1,
            });
          });
        }
        // 收服关系获取
        if (currentNode.subdueOut.length !== 0) {
          currentNode.subdueOut.forEach((currentNode2) => {
            this.graphData.links.push({
              source: currentNode.id,
              target: currentNode2.id,
              text: "收服",
              value: 1,
            });
          });
        }
        // 兄弟关系获取
        if (currentNode.brotherOut.length !== 0) {
          currentNode.brotherOut.forEach((currentNode2) => {
            this.graphData.links.push({
              source: currentNode.id,
              target: currentNode2.id,
              text: "兄弟",
              value: 1,
            });
          });
        }
      });
      // const linkGroup2 = {};
      // this.graphData.links.forEach((currentLink, index, arr) => {
      //   let key = currentLink.source + ":" + currentLink.target;
      //   if (!linkGroup2.hasOwnProperty(key)) linkGroup2[key] = [];
      //   linkGroup2[key].push(currentLink);
      // });

      var chart = this.ForceGraph(this.graphData, {
        nodeId: (d) => d.id,
        nodeGroup: (d) => d.group,
        nodeName: (d) => d.name,
        nodeOriginalShape: (d) => d.original_shape,
        nodeOtherName: (d) => d.other_name,
        nodePlace: (d) => d.place,
        nodeRole: (d) => d.role,
        nodeSex: (d) => d.sex,
        nodeTitle: (d) => `${d.name}`, //节点标题
        linkStrokeWidth: (l) => Math.sqrt(l.value),
        width: window.innerWidth,
        height: window.innerHeight,
        nodeRadius: 15, //节点半径
        nodeStroke: "#ccc", //节点颜色
        nodeStrokeWidth: 2, //节点边框宽度
      });
      document.getElementById("graph").appendChild(chart);
    });
  },
  methods: {
    searchName() {
      if (this.searchStr !== "") {
        findRelatedActor({ name: this.searchStr }).then((res) => {
          console.log(res);
        });
      }
    },
    ForceGraph(
      {
        nodes, // an iterable of node objects (typically [{id}, …])
        links, // an iterable of link objects (typically [{source, target}, …])
      },
      {
        nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
        nodeGroup, // given d in nodes, returns an (ordinal) value for color
        nodeName = (d) => d.name,
        nodeOriginalShape = (d) => d.original_shape,
        nodeOtherName = (d) => d.other_name,
        nodePlace = (d) => d.place,
        nodeRole = (d) => d.role,
        nodeSex = (d) => d.sex,
        nodeGroups, // an array of ordinal values representing the node groups
        nodeTitle, // given d in nodes, a title string
        nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
        nodeStroke = "#fff", // node stroke color节点边框颜色
        nodeStrokeWidth = 0.5, // node stroke width, in pixels节点边框宽度
        nodeStrokeOpacity = 1, // node stroke opacity节点边框透明度
        nodeRadius = 5, // node radius, in pixels节点半径
        nodeStrength,
        linkSource = ({ source }) => source, // given d in links, returns a node identifier string
        linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
        linkText = ({ text }) => text, //边的文字
        linkStroke = "#888", // link stroke color
        linkStrokeOpacity = 1, // link stroke opacity
        linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
        linkStrokeLinecap = "round", // link stroke linecap
        linkStrength,
        colors = d3.schemeTableau10, // an array of color strings, for the node groups
        width = 640, // outer width, in pixels
        height = 400, // outer height, in pixels
        invalidation, // when this promise resolves, stop the simulation
        linkDescriptionColor = "#000", //连线描述颜色
      } = {}
    ) {
      const _this = this;
      // var linkGroup = {}; //用来分组，将两点之间的连线进行归类
      // var linkMap = {}; //对连线计数
      // links.forEach((c, i) => {
      //   let key = c.source + ":" + c.target;
      //   if (!linkMap.hasOwnProperty(key)) linkMap[key] = 0;
      //   linkMap[key] += 1;
      //   if (!linkGroup.hasOwnProperty(key)) linkGroup[key] = [];
      //   linkGroup[key].push(c);
      // });
      // links.forEach((c, i) => {
      //   let key = c.source + ":" + c.target;
      //   // 确定关系最大编号。为了使得连接两个实体的关系曲线呈现对称，根据关系数量奇偶性进行平分。
      //   c.linkNum = linkMap[key];
      // });
      // Compute values.
      const NId = d3.map(nodes, nodeId).map(intern); //['id1', 'id2', '...', ...] 各个节点的id
      const NName = d3.map(nodes, nodeName).map(intern);
      const NOriginalShape = d3.map(nodes, nodeOriginalShape).map(intern);
      const NOtherName = d3.map(nodes, nodeOtherName).map(intern);
      const NPlace = d3.map(nodes, nodePlace).map(intern);
      const NRole = d3.map(nodes, nodeRole).map(intern);
      const NSex = d3.map(nodes, nodeSex).map(intern);
      const LS = d3.map(links, linkSource).map(intern); //起始节点id  ['', ...]
      const LT = d3.map(links, linkTarget).map(intern); //目标节点id
      const LText = d3.map(links, linkText).map(intern); //连线文字
      if (nodeTitle === undefined) nodeTitle = (_, i) => NName[i];
      const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle); //标题
      const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern); //分组
      const W =
        typeof linkStrokeWidth !== "function"
          ? null
          : d3.map(links, linkStrokeWidth); //连线宽度
      const L =
        typeof linkStroke !== "function" ? null : d3.map(links, linkStroke); //连线颜色

      // Replace the input nodes and links with mutable objects for the simulation.
      nodes = d3.map(nodes, (_, i) => ({
        id: NId[i],
        name: NName[i],
        original_shape: NOriginalShape[i],
        other_name: NOtherName[i],
        place: NPlace[i],
        role: NRole[i],
        sex: NSex[i],
      }));

      links = d3.map(links, (_, i) => ({
        source: LS[i],
        target: LT[i],
        text: LText[i],
      }));

      // 最大条数
      var maxSame = 0;
      links.forEach((c) => {
        if (c.sameIndex == undefined) {
          var same = [];
          var sameAlt = [];
          links.forEach((c2) => {
            if (c.source == c2.source && c.target == c2.target) {
              same.push(c2);
            } else if (c.source == c2.target && c.target == c2.source) {
              sameAlt.push(c2);
            }
          });
          var sameAll = same.concat(sameAlt);
          sameAll.forEach((ca, i) => {
            ca.sameIndex = i+1; // 当前编号
            ca.sameTotal = sameAll.length; //相同节点间的连线数量
            maxSame = ca.sameTotal > maxSame ? ca.sameTotal : maxSame;
            ca.sameTotalHalf = ca.sameTotal / 2; //中间位置
            ca.sameUneven = ca.sameTotal % 2 != 0; //是否对称
            ca.sameMiddleLink =
              ca.sameUneven == true &&
              Math.ceil(ca.sameTotalHalf) == ca.sameIndex; //不对称前提下，是否是中间轴
            ca.sameLowerHalf = ca.sameIndex <= ca.sameTotalHalf; //是否小于中间轴
            ca.sameArcDirection = ca.sameLowerHalf ? 0 : 1; //大小于中间位的标志
            ca.sameIndexCorrected = ca.sameLowerHalf ? ca.sameIndex : (ca.sameIndex - Math.ceil(ca.sameTotalHalf));  //相比于中间轴的位置
          });
        }
      });

      links.forEach((c) => {
        c.maxSameHalf = Math.floor(maxSame / 3); //Math.floor(x)返回小于等于x的最大整数
      });

      // Compute default domains.
      if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

      // Construct the scales.
      const color =
        nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

      // Construct the forces.
      const forceNode = d3.forceManyBody();
      const forceLink = d3
        .forceLink(links)
        .id(({ index: i }) => NId[i])
        .distance(80); //加上dsitance使连线长度增加
      if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
      if (linkStrength !== undefined) forceLink.strength(linkStrength);
      const simulation = d3
        .forceSimulation(nodes)
        .force("link", forceLink) //连接线
        .force("charge", forceNode) //引力
        .force("center", d3.forceCenter()) //整个实例中心
        .force(
          "collide",
          d3.forceCollide().radius(() => 20)
        ) //碰撞半径，防止节点重合
        .on("tick", ticked);
      const svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

      const marker = svg
        .append("marker")
        .attr("id", "direction")
        .attr("orient", "auto")
        .attr("stroke-width", 2)
        .attr("markerUnits", "strokeWidth")
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10") //坐标系的区域
        .attr("refX", nodeRadius + nodeStrokeWidth * 2 + 10) //调整在线上的距离
        .attr("refY", 0)
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .append("path")
        .attr("d", "M 0 -5 L 10 0 L 0 5")
        .attr("fill", linkStroke);
      const marker2 = svg
        .append("marker")
        .attr("id", "direction2")
        .attr("orient", "auto")
        .attr("stroke-width", 2)
        .attr("markerUnits", "strokeWidth")
        .attr("markerUnits", "userSpaceOnUse")
        .attr("viewBox", "0 -5 10 10") //坐标系的区域
        .attr("refX", nodeRadius + nodeStrokeWidth * 2 + 10) //调整在线上的距离
        .attr("refY", 0)
        .attr("markerWidth", 8)
        .attr("markerHeight", 8)
        .append("path")
        .attr("d", "M 0 -5 L 10 0 L 0 5")
        .attr("fill", "#000");
      // .attr("stroke-opacity", linkStrokeOpacity);

      const g = svg.append("g").attr("class", "everything");

      //add zoom capabilities
      const zoom_handler = d3.zoom().on("zoom", zoom_actions);

      zoom_handler(svg);

      function zoom_actions(event) {
        g.attr("transform", event.transform);
      }
      const link = g
        .append("g")
        .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
        .attr("stroke-opacity", linkStrokeOpacity)
        .attr(
          "stroke-width",
          typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null
        )
        .attr("stroke-linecap", linkStrokeLinecap)
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("marker-end", "url(#direction)")
        .attr("id", (d) => {
          return d.source.id + "_" + d.text + "_" + d.target.id;
        });

      const node = g
        .append("g")
        .attr("fill", nodeFill)
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .selectAll("circle") //返回的是所有圆的空引用(这些圆此时并不存在)
        .data(nodes) //将我们的数据绑定到我们将要创建的元素上
        .join("circle") //添加一个circle到DOM中
        .attr("r", nodeRadius)
        .attr("id", (d) => "id_" + d.id)
        .on("mouseover", function (e, d) {
          _this.$refs.detailPanel.currentNode = d;
          link
            .attr("stroke", (edge) => {
              // 得到与鼠标放置相关联的节点与边
              if (edge.source === d || edge.target === d) {
                d3.select("#" + "id_" + edge.source.id)
                  .attr("r", nodeRadius)
                  .attr("stroke-width", nodeStrokeWidth + 1);
                d3.select("#" + "id_" + edge.target.id)
                  .attr("r", nodeRadius)
                  .attr("stroke-width", nodeStrokeWidth + 1);
                return "#000";
              }
            })
            .attr("marker-end", (edge) => {
              if (edge.source === d || edge.target === d) {
                return "url(#direction2)";
              } else {
                return "url(#direction)";
              }
            });
          d3.select(this).attr("stroke-width", nodeStrokeWidth + 1);
        })
        .on("mouseout", function (e, d) {
          link
            .attr("stroke", (edge) => {
              if (edge.source === d || edge.target === d) {
                d3.select("#" + "id_" + edge.source.id)
                  .attr("r", nodeRadius)
                  .attr("stroke-width", nodeStrokeWidth);
                d3.select("#" + "id_" + edge.target.id)
                  .attr("r", nodeRadius)
                  .attr("stroke-width", nodeStrokeWidth);
                return linkStroke;
              }
            })
            .attr("marker-end", (edge) => {
              if (edge.source === d || edge.target === d) {
                return "url(#direction)";
              } else {
                return "url(#direction)";
              }
            });
          d3.select(this).attr("stroke-width", nodeStrokeWidth);
        })
        .call(drag(simulation));

      if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
      if (L) link.attr("stroke", ({ index: i }) => L[i]);
      if (G) node.attr("fill", ({ index: i }) => color(G[i]));
      if (T) node.append("title").text(({ index: i }) => T[i]);
      if (invalidation != null) invalidation.then(() => simulation.stop());

      const nodeText = g
        .append("g")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .attr("font-size", 6)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("dominant-baseline", "central ")
        .attr("fill", "#fff")
        .text((d) => {
          let name = d.name;
          let context = document.createElement("canvas").getContext("2d");
          // len += context.measureText(name[i]).width;
          if (name.length <= 4) {
            return name;
          } else if (name.length > 4) {
            return name[0] + name[1] + name[2] + "...";
          }
        });

      const linkDescription = g
        .append("g")
        .selectAll("text")
        .data(links)
        .join("text")
        .attr("font-size", 6)
        .attr("fill", linkDescriptionColor)
        .attr("dominant-baseline", "text-after-edge")
        .append("textPath")
        .attr(
          "xlink:href",
          (d) => "#" + d.source.id + "_" + d.text + "_" + d.target.id
        )
        .attr("startOffset", "40%")
        .text(function (d) {
          return d.text;
        });

      function intern(value) {
        return value !== null && typeof value === "object"
          ? value.valueOf()
          : value;
      }

      //每个改变都会调用
      function ticked() {
        link.attr("fill", "none").attr("d", (d) => {
          // return (
          //     "M " +
          //     d.source.x +
          //     " " +
          //     d.source.y +
          //     " L " +
          //     d.target.x +
          //     " " +
          //     d.target.y
          //   );
          var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy),
            unevenCorrection = d.sameUneven ? 0 : 0.5,
            arc =
              (dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection);

          if (d.sameMiddleLink) {
            arc = 0;
          }
          return (
            "M" +
            d.source.x +
            " " +
            d.source.y +
            " A " +
            arc +
            " " +
            arc +
            " 0 0 " +
            d.sameArcDirection +
            " " +
            d.target.x +
            " " +
            d.target.y
          );

          // M:起点；L:画一条直线；
          /*
          A ( rx ry x-axis-rotation large-arc-flag sweep-flag x y)
          椭圆弧线命令在当前点与指定的终点 (x, y)之间创建一条椭圆弧线。
          rx ，ry 是椭圆弧的半长轴，半短轴长度 
          x-axis-rotation 是此段弧所在的椭圆的 x 轴与水平方向的夹角，即 x 轴的旋转角度 
          large-arc-flag 和 sweep-flag 决定了椭圆弧的绘制方向，值是 0 或 1 
          x,y 是椭圆弧终端坐标 
          椭圆圆心是计算出来的，不需要指定 
          large-arc-flag 为1 表示大角度弧线，0 代表小角度弧线 
          sweep-flag , 1 代表从起点到终点弧线绕椭圆中心顺时针方向，0 代表逆时针方向
          */
        });

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        nodeText.attr("x", (d) => d.x).attr("y", (d) => d.y);
      }

      function getCoord(source, target, r) {
        //根据目标节点的类型，计算路径的长度，让路径指向目标节点的边，而不是圆心
        let scale =
          r /
          Math.sqrt(
            Math.pow(target.y - source.y, 2) + Math.pow(target.x - source.x, 2)
          );

        let targetX = target.x - scale * (target.x - source.x);
        let targetY = target.y - scale * (target.y - source.y);
        return targetX + " " + targetY;
      }

      function drag(simulation) {
        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }

        function dragged(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }

        function dragended(event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }

        return d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }

      return Object.assign(svg.node(), { scales: { color } });
    },
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  /* background-color: #b3c0d1; */
  /* color: #333; */
  text-align: center;
  line-height: 60px;
}

.el-aside {
  /* background-color: #d3dce6; */
  /* color: #333; */
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3; */
  /* color: #333; */
  text-align: center;
  line-height: 160px;
}

.graph {
  border-radius: 20px;
  background-image: linear-gradient(135deg, #ffcf71 10%, #2376dd 100%);
}
</style>


