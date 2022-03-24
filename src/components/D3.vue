<template>
  <div id="graph" class="graph"></div>
</template>

<script>
// import { ForceGraph } from "@/api/d3_tool";
import {
  findByName,
  findAllPerson,
  findByTitle,
  findAllMovie,
  findAllNodes,
  findAllLinks,
  findActedBy,
} from "@/api/d3_util";
import * as d3 from "d3";

export default {
  data() {
    return {
      graphData: {
        nodes: [
          { id: "Myriel", group: 1 },
          { id: "Napoleon", group: 1 },
          { id: "Mlle.Baptistine", group: 1 },
          { id: "Mme.Magloire", group: 1 },
          { id: "CountessdeLo", group: 1 },
          { id: "Geborand", group: 1 },
          { id: "Champtercier", group: 1 },
          { id: "Cravatte", group: 1 },
          { id: "Count", group: 1 },
          { id: "OldMan", group: 1 },
          { id: "Labarre", group: 2 },
          { id: "Valjean", group: 2 },
          { id: "Marguerite", group: 3 },
          { id: "Mme.deR", group: 2 },
          { id: "Isabeau", group: 2 },
          { id: "Gervais", group: 2 },
          { id: "Tholomyes", group: 3 },
          { id: "Listolier", group: 3 },
          { id: "Fameuil", group: 3 },
          { id: "Blacheville", group: 3 },
          { id: "Favourite", group: 3 },
          { id: "Dahlia", group: 3 },
          { id: "Zephine", group: 3 },
          { id: "Fantine", group: 3 },
          { id: "Mme.Thenardier", group: 4 },
          { id: "Thenardier", group: 4 },
          { id: "Cosette", group: 5 },
          { id: "Javert", group: 4 },
          { id: "Fauchelevent", group: 0 },
          { id: "Bamatabois", group: 2 },
          { id: "Perpetue", group: 3 },
          { id: "Simplice", group: 2 },
          { id: "Scaufflaire", group: 2 },
          { id: "Woman1", group: 2 },
          { id: "Judge", group: 2 },
          { id: "Champmathieu", group: 2 },
          { id: "Brevet", group: 2 },
          { id: "Chenildieu", group: 2 },
          { id: "Cochepaille", group: 2 },
          { id: "Pontmercy", group: 4 },
          { id: "Boulatruelle", group: 6 },
          { id: "Eponine", group: 4 },
          { id: "Anzelma", group: 4 },
          { id: "Woman2", group: 5 },
          { id: "MotherInnocent", group: 0 },
          { id: "Gribier", group: 0 },
          { id: "Jondrette", group: 7 },
          { id: "Mme.Burgon", group: 7 },
          { id: "Gavroche", group: 8 },
          { id: "Gillenormand", group: 5 },
          { id: "Magnon", group: 5 },
          { id: "Mlle.Gillenormand", group: 5 },
          { id: "Mme.Pontmercy", group: 5 },
          { id: "Mlle.Vaubois", group: 5 },
          { id: "Lt.Gillenormand", group: 5 },
          { id: "Marius", group: 8 },
          { id: "BaronessT", group: 5 },
          { id: "Mabeuf", group: 8 },
          { id: "Enjolras", group: 8 },
          { id: "Combeferre", group: 8 },
          { id: "Prouvaire", group: 8 },
          { id: "Feuilly", group: 8 },
          { id: "Courfeyrac", group: 8 },
          { id: "Bahorel", group: 8 },
          { id: "Bossuet", group: 8 },
          { id: "Joly", group: 8 },
          { id: "Grantaire", group: 8 },
          { id: "MotherPlutarch", group: 9 },
          { id: "Gueulemer", group: 4 },
          { id: "Babet", group: 4 },
          { id: "Claquesous", group: 4 },
          { id: "Montparnasse", group: 4 },
          { id: "Toussaint", group: 5 },
          { id: "Child1", group: 10 },
          { id: "Child2", group: 10 },
          { id: "Brujon", group: 4 },
          { id: "Mme.Hucheloup", group: 8 },
        ],
        links: [
          { source: "Napoleon", target: "Myriel", value: 1 },
          { source: "Mlle.Baptistine", target: "Myriel", value: 8 },
          { source: "Mme.Magloire", target: "Myriel", value: 10 },
          { source: "Mme.Magloire", target: "Mlle.Baptistine", value: 6 },
          { source: "CountessdeLo", target: "Myriel", value: 1 },
          { source: "Geborand", target: "Myriel", value: 1 },
          { source: "Champtercier", target: "Myriel", value: 1 },
          { source: "Cravatte", target: "Myriel", value: 1 },
          { source: "Count", target: "Myriel", value: 2 },
          { source: "OldMan", target: "Myriel", value: 1 },
          { source: "Valjean", target: "Labarre", value: 1 },
          { source: "Valjean", target: "Mme.Magloire", value: 3 },
          { source: "Valjean", target: "Mlle.Baptistine", value: 3 },
          { source: "Valjean", target: "Myriel", value: 5 },
          { source: "Marguerite", target: "Valjean", value: 1 },
          { source: "Mme.deR", target: "Valjean", value: 1 },
          { source: "Isabeau", target: "Valjean", value: 1 },
          { source: "Gervais", target: "Valjean", value: 1 },
          { source: "Listolier", target: "Tholomyes", value: 4 },
          { source: "Fameuil", target: "Tholomyes", value: 4 },
          { source: "Fameuil", target: "Listolier", value: 4 },
          { source: "Blacheville", target: "Tholomyes", value: 4 },
          { source: "Blacheville", target: "Listolier", value: 4 },
          { source: "Blacheville", target: "Fameuil", value: 4 },
          { source: "Favourite", target: "Tholomyes", value: 3 },
          { source: "Favourite", target: "Listolier", value: 3 },
          { source: "Favourite", target: "Fameuil", value: 3 },
          { source: "Favourite", target: "Blacheville", value: 4 },
          { source: "Dahlia", target: "Tholomyes", value: 3 },
          { source: "Dahlia", target: "Listolier", value: 3 },
          { source: "Dahlia", target: "Fameuil", value: 3 },
          { source: "Dahlia", target: "Blacheville", value: 3 },
          { source: "Dahlia", target: "Favourite", value: 5 },
          { source: "Zephine", target: "Tholomyes", value: 3 },
          { source: "Zephine", target: "Listolier", value: 3 },
          { source: "Zephine", target: "Fameuil", value: 3 },
          { source: "Zephine", target: "Blacheville", value: 3 },
          { source: "Zephine", target: "Favourite", value: 4 },
          { source: "Zephine", target: "Dahlia", value: 4 },
          { source: "Fantine", target: "Tholomyes", value: 3 },
          { source: "Fantine", target: "Listolier", value: 3 },
          { source: "Fantine", target: "Fameuil", value: 3 },
          { source: "Fantine", target: "Blacheville", value: 3 },
          { source: "Fantine", target: "Favourite", value: 4 },
          { source: "Fantine", target: "Dahlia", value: 4 },
          { source: "Fantine", target: "Zephine", value: 4 },
          { source: "Fantine", target: "Marguerite", value: 2 },
          { source: "Fantine", target: "Valjean", value: 9 },
          { source: "Mme.Thenardier", target: "Fantine", value: 2 },
          { source: "Mme.Thenardier", target: "Valjean", value: 7 },
          { source: "Thenardier", target: "Mme.Thenardier", value: 13 },
          { source: "Thenardier", target: "Fantine", value: 1 },
          { source: "Thenardier", target: "Valjean", value: 12 },
          { source: "Cosette", target: "Mme.Thenardier", value: 4 },
          { source: "Cosette", target: "Valjean", value: 31 },
          { source: "Cosette", target: "Tholomyes", value: 1 },
          { source: "Cosette", target: "Thenardier", value: 1 },
          { source: "Javert", target: "Valjean", value: 17 },
          { source: "Javert", target: "Fantine", value: 5 },
          { source: "Javert", target: "Thenardier", value: 5 },
          { source: "Javert", target: "Mme.Thenardier", value: 1 },
          { source: "Javert", target: "Cosette", value: 1 },
          { source: "Fauchelevent", target: "Valjean", value: 8 },
          { source: "Fauchelevent", target: "Javert", value: 1 },
          { source: "Bamatabois", target: "Fantine", value: 1 },
          { source: "Bamatabois", target: "Javert", value: 1 },
          { source: "Bamatabois", target: "Valjean", value: 2 },
          { source: "Perpetue", target: "Fantine", value: 1 },
          { source: "Simplice", target: "Perpetue", value: 2 },
          { source: "Simplice", target: "Valjean", value: 3 },
          { source: "Simplice", target: "Fantine", value: 2 },
          { source: "Simplice", target: "Javert", value: 1 },
          { source: "Scaufflaire", target: "Valjean", value: 1 },
          { source: "Woman1", target: "Valjean", value: 2 },
          { source: "Woman1", target: "Javert", value: 1 },
          { source: "Judge", target: "Valjean", value: 3 },
          { source: "Judge", target: "Bamatabois", value: 2 },
          { source: "Champmathieu", target: "Valjean", value: 3 },
          { source: "Champmathieu", target: "Judge", value: 3 },
          { source: "Champmathieu", target: "Bamatabois", value: 2 },
          { source: "Brevet", target: "Judge", value: 2 },
          { source: "Brevet", target: "Champmathieu", value: 2 },
          { source: "Brevet", target: "Valjean", value: 2 },
          { source: "Brevet", target: "Bamatabois", value: 1 },
          { source: "Chenildieu", target: "Judge", value: 2 },
          { source: "Chenildieu", target: "Champmathieu", value: 2 },
          { source: "Chenildieu", target: "Brevet", value: 2 },
          { source: "Chenildieu", target: "Valjean", value: 2 },
          { source: "Chenildieu", target: "Bamatabois", value: 1 },
          { source: "Cochepaille", target: "Judge", value: 2 },
          { source: "Cochepaille", target: "Champmathieu", value: 2 },
          { source: "Cochepaille", target: "Brevet", value: 2 },
          { source: "Cochepaille", target: "Chenildieu", value: 2 },
          { source: "Cochepaille", target: "Valjean", value: 2 },
          { source: "Cochepaille", target: "Bamatabois", value: 1 },
          { source: "Pontmercy", target: "Thenardier", value: 1 },
          { source: "Boulatruelle", target: "Thenardier", value: 1 },
          { source: "Eponine", target: "Mme.Thenardier", value: 2 },
          { source: "Eponine", target: "Thenardier", value: 3 },
          { source: "Anzelma", target: "Eponine", value: 2 },
          { source: "Anzelma", target: "Thenardier", value: 2 },
          { source: "Anzelma", target: "Mme.Thenardier", value: 1 },
          { source: "Woman2", target: "Valjean", value: 3 },
          { source: "Woman2", target: "Cosette", value: 1 },
          { source: "Woman2", target: "Javert", value: 1 },
          { source: "MotherInnocent", target: "Fauchelevent", value: 3 },
          { source: "MotherInnocent", target: "Valjean", value: 1 },
          { source: "Gribier", target: "Fauchelevent", value: 2 },
          { source: "Mme.Burgon", target: "Jondrette", value: 1 },
          { source: "Gavroche", target: "Mme.Burgon", value: 2 },
          { source: "Gavroche", target: "Thenardier", value: 1 },
          { source: "Gavroche", target: "Javert", value: 1 },
          { source: "Gavroche", target: "Valjean", value: 1 },
          { source: "Gillenormand", target: "Cosette", value: 3 },
          { source: "Gillenormand", target: "Valjean", value: 2 },
          { source: "Magnon", target: "Gillenormand", value: 1 },
          { source: "Magnon", target: "Mme.Thenardier", value: 1 },
          { source: "Mlle.Gillenormand", target: "Gillenormand", value: 9 },
          { source: "Mlle.Gillenormand", target: "Cosette", value: 2 },
          { source: "Mlle.Gillenormand", target: "Valjean", value: 2 },
          { source: "Mme.Pontmercy", target: "Mlle.Gillenormand", value: 1 },
          { source: "Mme.Pontmercy", target: "Pontmercy", value: 1 },
          { source: "Mlle.Vaubois", target: "Mlle.Gillenormand", value: 1 },
          { source: "Lt.Gillenormand", target: "Mlle.Gillenormand", value: 2 },
          { source: "Lt.Gillenormand", target: "Gillenormand", value: 1 },
          { source: "Lt.Gillenormand", target: "Cosette", value: 1 },
          { source: "Marius", target: "Mlle.Gillenormand", value: 6 },
          { source: "Marius", target: "Gillenormand", value: 12 },
          { source: "Marius", target: "Pontmercy", value: 1 },
          { source: "Marius", target: "Lt.Gillenormand", value: 1 },
          { source: "Marius", target: "Cosette", value: 21 },
          { source: "Marius", target: "Valjean", value: 19 },
          { source: "Marius", target: "Tholomyes", value: 1 },
          { source: "Marius", target: "Thenardier", value: 2 },
          { source: "Marius", target: "Eponine", value: 5 },
          { source: "Marius", target: "Gavroche", value: 4 },
          { source: "BaronessT", target: "Gillenormand", value: 1 },
          { source: "BaronessT", target: "Marius", value: 1 },
          { source: "Mabeuf", target: "Marius", value: 1 },
          { source: "Mabeuf", target: "Eponine", value: 1 },
          { source: "Mabeuf", target: "Gavroche", value: 1 },
          { source: "Enjolras", target: "Marius", value: 7 },
          { source: "Enjolras", target: "Gavroche", value: 7 },
          { source: "Enjolras", target: "Javert", value: 6 },
          { source: "Enjolras", target: "Mabeuf", value: 1 },
          { source: "Enjolras", target: "Valjean", value: 4 },
          { source: "Combeferre", target: "Enjolras", value: 15 },
          { source: "Combeferre", target: "Marius", value: 5 },
          { source: "Combeferre", target: "Gavroche", value: 6 },
          { source: "Combeferre", target: "Mabeuf", value: 2 },
          { source: "Prouvaire", target: "Gavroche", value: 1 },
          { source: "Prouvaire", target: "Enjolras", value: 4 },
          { source: "Prouvaire", target: "Combeferre", value: 2 },
          { source: "Feuilly", target: "Gavroche", value: 2 },
          { source: "Feuilly", target: "Enjolras", value: 6 },
          { source: "Feuilly", target: "Prouvaire", value: 2 },
          { source: "Feuilly", target: "Combeferre", value: 5 },
          { source: "Feuilly", target: "Mabeuf", value: 1 },
          { source: "Feuilly", target: "Marius", value: 1 },
          { source: "Courfeyrac", target: "Marius", value: 9 },
          { source: "Courfeyrac", target: "Enjolras", value: 17 },
          { source: "Courfeyrac", target: "Combeferre", value: 13 },
          { source: "Courfeyrac", target: "Gavroche", value: 7 },
          { source: "Courfeyrac", target: "Mabeuf", value: 2 },
          { source: "Courfeyrac", target: "Eponine", value: 1 },
          { source: "Courfeyrac", target: "Feuilly", value: 6 },
          { source: "Courfeyrac", target: "Prouvaire", value: 3 },
          { source: "Bahorel", target: "Combeferre", value: 5 },
          { source: "Bahorel", target: "Gavroche", value: 5 },
          { source: "Bahorel", target: "Courfeyrac", value: 6 },
          { source: "Bahorel", target: "Mabeuf", value: 2 },
          { source: "Bahorel", target: "Enjolras", value: 4 },
          { source: "Bahorel", target: "Feuilly", value: 3 },
          { source: "Bahorel", target: "Prouvaire", value: 2 },
          { source: "Bahorel", target: "Marius", value: 1 },
          { source: "Bossuet", target: "Marius", value: 5 },
          { source: "Bossuet", target: "Courfeyrac", value: 12 },
          { source: "Bossuet", target: "Gavroche", value: 5 },
          { source: "Bossuet", target: "Bahorel", value: 4 },
          { source: "Bossuet", target: "Enjolras", value: 10 },
          { source: "Bossuet", target: "Feuilly", value: 6 },
          { source: "Bossuet", target: "Prouvaire", value: 2 },
          { source: "Bossuet", target: "Combeferre", value: 9 },
          { source: "Bossuet", target: "Mabeuf", value: 1 },
          { source: "Bossuet", target: "Valjean", value: 1 },
          { source: "Joly", target: "Bahorel", value: 5 },
          { source: "Joly", target: "Bossuet", value: 7 },
          { source: "Joly", target: "Gavroche", value: 3 },
          { source: "Joly", target: "Courfeyrac", value: 5 },
          { source: "Joly", target: "Enjolras", value: 5 },
          { source: "Joly", target: "Feuilly", value: 5 },
          { source: "Joly", target: "Prouvaire", value: 2 },
          { source: "Joly", target: "Combeferre", value: 5 },
          { source: "Joly", target: "Mabeuf", value: 1 },
          { source: "Joly", target: "Marius", value: 2 },
          { source: "Grantaire", target: "Bossuet", value: 3 },
          { source: "Grantaire", target: "Enjolras", value: 3 },
          { source: "Grantaire", target: "Combeferre", value: 1 },
          { source: "Grantaire", target: "Courfeyrac", value: 2 },
          { source: "Grantaire", target: "Joly", value: 2 },
          { source: "Grantaire", target: "Gavroche", value: 1 },
          { source: "Grantaire", target: "Bahorel", value: 1 },
          { source: "Grantaire", target: "Feuilly", value: 1 },
          { source: "Grantaire", target: "Prouvaire", value: 1 },
          { source: "MotherPlutarch", target: "Mabeuf", value: 3 },
          { source: "Gueulemer", target: "Thenardier", value: 5 },
          { source: "Gueulemer", target: "Valjean", value: 1 },
          { source: "Gueulemer", target: "Mme.Thenardier", value: 1 },
          { source: "Gueulemer", target: "Javert", value: 1 },
          { source: "Gueulemer", target: "Gavroche", value: 1 },
          { source: "Gueulemer", target: "Eponine", value: 1 },
          { source: "Babet", target: "Thenardier", value: 6 },
          { source: "Babet", target: "Gueulemer", value: 6 },
          { source: "Babet", target: "Valjean", value: 1 },
          { source: "Babet", target: "Mme.Thenardier", value: 1 },
          { source: "Babet", target: "Javert", value: 2 },
          { source: "Babet", target: "Gavroche", value: 1 },
          { source: "Babet", target: "Eponine", value: 1 },
          { source: "Claquesous", target: "Thenardier", value: 4 },
          { source: "Claquesous", target: "Babet", value: 4 },
          { source: "Claquesous", target: "Gueulemer", value: 4 },
          { source: "Claquesous", target: "Valjean", value: 1 },
          { source: "Claquesous", target: "Mme.Thenardier", value: 1 },
          { source: "Claquesous", target: "Javert", value: 1 },
          { source: "Claquesous", target: "Eponine", value: 1 },
          { source: "Claquesous", target: "Enjolras", value: 1 },
          { source: "Montparnasse", target: "Javert", value: 1 },
          { source: "Montparnasse", target: "Babet", value: 2 },
          { source: "Montparnasse", target: "Gueulemer", value: 2 },
          { source: "Montparnasse", target: "Claquesous", value: 2 },
          { source: "Montparnasse", target: "Valjean", value: 1 },
          { source: "Montparnasse", target: "Gavroche", value: 1 },
          { source: "Montparnasse", target: "Eponine", value: 1 },
          { source: "Montparnasse", target: "Thenardier", value: 1 },
          { source: "Toussaint", target: "Cosette", value: 2 },
          { source: "Toussaint", target: "Javert", value: 1 },
          { source: "Toussaint", target: "Valjean", value: 1 },
          { source: "Child1", target: "Gavroche", value: 2 },
          { source: "Child2", target: "Gavroche", value: 2 },
          { source: "Child2", target: "Child1", value: 3 },
          { source: "Brujon", target: "Babet", value: 3 },
          { source: "Brujon", target: "Gueulemer", value: 3 },
          { source: "Brujon", target: "Thenardier", value: 3 },
          { source: "Brujon", target: "Gavroche", value: 1 },
          { source: "Brujon", target: "Eponine", value: 1 },
          { source: "Brujon", target: "Claquesous", value: 1 },
          { source: "Brujon", target: "Montparnasse", value: 1 },
          { source: "Mme.Hucheloup", target: "Bossuet", value: 1 },
          { source: "Mme.Hucheloup", target: "Joly", value: 1 },
          { source: "Mme.Hucheloup", target: "Grantaire", value: 1 },
          { source: "Mme.Hucheloup", target: "Bahorel", value: 1 },
          { source: "Mme.Hucheloup", target: "Courfeyrac", value: 1 },
          { source: "Mme.Hucheloup", target: "Gavroche", value: 1 },
          { source: "Mme.Hucheloup", target: "Enjolras", value: 1 },
        ],
      },
      chart: "",
      name: "",
    };
  },

  mounted() {
    // findByName('Carrie-Anne Moss').then((res) => {
    //   console.log(res)
    // })
    // var chart = this.ForceGraph(this.graphData, {
    //   nodeId: (d) => d.id,
    //   nodeGroup: (d) => d.group,
    //   nodeTitle: (d) => `${d.id}`, //节点标题
    //   linkStrokeWidth: (l) => Math.sqrt(l.value),
    //   width: window.innerWidth,
    //   height: window.innerHeight * 0.9,
    //   nodeRadius: 20, //节点半径
    //   nodeStroke: "#ccc", //节点颜色
    //   nodeStrokeWidth: 2, //节点边框宽度
    // });
    // document.getElementById("graph").appendChild(chart);
    findAllNodes().then((res) => {
      // this.graphData.nodes = [
      //   { id: "Myriel", group: 1 },
      //   { id: "Napoleon", group: 1 },
      // ];
      this.graphData.nodes = res;
      findAllLinks().then((res) => {
        this.graphData.links = res;
        var chart = this.ForceGraph(this.graphData, {
          nodeId: (d) => d.id,
          nodeGroup: (d) => d.group,
          nodeTitle: (d) => `${d.id}`, //节点标题
          linkStrokeWidth: (l) => Math.sqrt(l.value),
          width: window.innerWidth,
          height: window.innerHeight * 0.9,
          nodeRadius: 15, //节点半径
          nodeStroke: "#ccc", //节点颜色
          nodeStrokeWidth: 2, //节点边框宽度
        });
        document.getElementById("graph").appendChild(chart);
      });
    });
  },
  methods: {
    ForceGraph(
      {
        nodes, // an iterable of node objects (typically [{id}, …])
        links, // an iterable of link objects (typically [{source, target}, …])
      },
      {
        nodeId = (d) => d.id, // given d in nodes, returns a unique identifier (string)
        nodeGroup, // given d in nodes, returns an (ordinal) value for color
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
      // Compute values.
      const N = d3.map(nodes, nodeId).map(intern); //['id1', 'id2', '...', ...] 各个节点的id
      const LS = d3.map(links, linkSource).map(intern); //起始节点id  ['', ...]
      const LT = d3.map(links, linkTarget).map(intern); //目标节点id
      const LText = d3.map(links, linkText).map(intern); //连线文字
      if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
      const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle); //标题
      const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern); //分组
      const W =
        typeof linkStrokeWidth !== "function"
          ? null
          : d3.map(links, linkStrokeWidth); //连线宽度
      const L =
        typeof linkStroke !== "function" ? null : d3.map(links, linkStroke); //连线颜色

      // Replace the input nodes and links with mutable objects for the simulation.
      nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
      links = d3.map(links, (_, i) => ({
        source: LS[i],
        target: LT[i],
        text: LText[i],
      }));

      // Compute default domains.
      if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

      // Construct the scales.
      const color =
        nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

      // Construct the forces.
      const forceNode = d3.forceManyBody();
      const forceLink = d3
        .forceLink(links)
        .id(({ index: i }) => N[i])
        .distance(100); //加上dsitance使连线长度增加
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
        .attr("id", (d) => d.source.id + "_" + d.text + "_" + d.target.id);

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
        .attr("id", (d) => d.id + "_" + d.index)
        .on("mouseover", function (e, d) {
          link
            .attr("stroke", (edge) => {
              // 得到与鼠标放置相关联的节点与边
              if (edge.source === d || edge.target === d) {
                d3.select("#" + edge.source.id + "_" + edge.source.index)
                  .attr("r", nodeRadius)
                  .attr("stroke-width", nodeStrokeWidth + 1);
                d3.select("#" + edge.target.id + "_" + edge.target.index)
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
          d3.select(this)
            .attr("r", () => {
              return nodeRadius + 0.5;
            })
            .attr("stroke-width", nodeStrokeWidth + 1);
        })
        .on("mouseout", function (e, d) {
          link
            .attr("stroke", (edge) => {
              if (edge.source === d || edge.target === d) {
                d3.select("#" + edge.source.id + "_" + edge.source.index)
                  .attr("r", nodeRadius)
                  .attr("stroke-width", nodeStrokeWidth);
                d3.select("#" + edge.target.id + "_" + edge.target.index)
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
        })
        .on("click", function (event, d) {
          findActedBy(d.id).then((res) => {
            console.log(res);
          });
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
          let name = d.id;
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
        link.attr(
          "d",
          (d) =>
            "M " +
            d.source.x +
            " " +
            d.source.y +
            " L " +
            d.target.x +
            " " +
            d.target.y
        );

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
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.graph {
  background-image: linear-gradient(135deg, #ffcf71 10%, #2376dd 100%);
}
</style>


