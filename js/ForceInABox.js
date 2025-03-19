/* global d3 */

function forceInABox(alpha) {
  function index(d) {
    return d.index;
  }

  var id = index,
      nodes,
      links, //needed for the force version
      tree,
      size = [0,0],
      nodesize = 1, // The expected node Size used for computing the cluster node
      forceCharge = -2,
      foci = {},
      // oldStart = force.start,
      linkStrengthIntraCluster = .1,
      linkStrengthInterCluster = .02,
      // oldGravity = force.gravity(),
      templateNodes = [],
      offset = [0,0],
      templateForce,
      templateNodesSel,
      groupBy = function (d) { return d.location_id; },
      template = "treemap",
      enableGrouping = true,
      strength = 0.1;
      // showingTemplate = false;


  function force(alpha) {
    if (!enableGrouping) {
      return force;
    }

    for (var i = 0, n = nodes.length, node, k = alpha * strength; i < n; ++i) {
      node = nodes[i];
      node.vx += (foci[groupBy(node)].x - node.x) * k*2;
      node.vy += (foci[groupBy(node)].y - node.y) * k*2;
    }

  }

  function initialize() {
    if (!nodes) return;
    if (template==="treemap") {
      initializeWithTreemap();
    } else {
      initializeWithForce();
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };


  function getFocisFromTemplate() {
    //compute foci
    foci.none = {x : 0, y : 0};
   
    parents.forEach(function (d) {
      if (template==="treemap") {
        foci[d.data.id] = {
          x : (d.x0 + (d.x1-d.x0) / 2) - offset[0],
          y : (d.y0 + (d.y1-d.y0) / 2) - offset[1]
        };
      } else {
        foci[d.id] = {x : d.x - offset[0] , y : d.y - offset[1]};
      }
    });
  }
  
  function initializeWithTreemap() {
    var treemap = d3.treemap()
      .size(force.size())
      .paddingOuter(10)
      .paddingTop(25)
 	  .paddingInner(5);
    
    tree = d3.hierarchy(layoutarray)
    .sum(function (d) { return d.Size; })
    .sort(function(a,b) {
        return a.data.level - b.data.level; });
    
    templateNodes = treemap(tree);
    parents = treemap(tree).descendants();
    getFocisFromTemplate();
  }

  function drawTreemap(container) {
    container.selectAll(".cell").remove();
    
     
    
    var cell =     
    	container.append("g")
        .attr("class", "treemap")
        .attr("transform", "translate(5,5)")
        .selectAll("treemap")
        .data(templateNodes.descendants())
        .enter();

      
      
    cell
      .append('rect')
      .attr("class", "cell")
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("x", function (d) { return d.x0; })
      .attr("y", function (d) { return d.y0; })
      .attr("width", function (d) { return d.x1-d.x0; })
      .attr("height", function (d) { return d.y1-d.y0; })
      .attr('fill', 'none')
      ;
    
    cell
      .append('text')
	  .classed('label', true)
	  .attr('x', function (d) { return d.x0; })
	  .attr('y', function (d) { return d.y0; })
	  .attr('dx', 5)
	  .attr('dy', 15)
	  .text(function (d) { return d.data.name; })

	  ;

  }


  force.drawTemplate = function (container) {
    // showingTemplate = true;
    if (template === "treemap") {
      drawTreemap(container);
    } else {
      drawGraph(container);
    }
    return force;
  };

  //Backwards compatibility
  force.drawTreemap = force.drawTemplate;

  force.deleteTemplate = function (container) {
    // showingTemplate = false;
    container.selectAll(".cell").remove();

    return force;
  };

  force.groupBy = function (x) {
    if (!arguments.length) return groupBy;
    if (typeof x === "string") {
      groupBy = function (d) {return d[x]; };
      return force;
    }
    groupBy = x;
    return force;
  };


  force.strength = function (x) {
    if (!arguments.length) return strength;
    strength = x;
    return force;
  };


  force.getLinkStrength = function (e) {
    if(enableGrouping)  {
      if (groupBy(e.source) === groupBy(e.target)) {
        if (typeof(linkStrengthIntraCluster)==="function") {
          return linkStrengthIntraCluster(e);
        } else {
          return linkStrengthIntraCluster;
        }
      } else {
        if (typeof(linkStrengthInterCluster)==="function") {
          return linkStrengthInterCluster(e);
        } else {
          return linkStrengthInterCluster;
        }
      }
    } else {
      // Not grouping return the intracluster
      if (typeof(linkStrengthIntraCluster)==="function") {
          return linkStrengthIntraCluster(e);
        } else {
          return linkStrengthIntraCluster;
        }

    }
  };

  force.size = function(_) {
    return arguments.length ? (size = _, force) : size;
  };

  force.linkStrengthInterCluster = function(_) {
    return arguments.length ? (linkStrengthInterCluster = _, force) : linkStrengthInterCluster;
  };

  force.linkStrengthIntraCluster = function(_) {
    return arguments.length ? (linkStrengthIntraCluster = _, force) : linkStrengthIntraCluster;
  };

  force.nodes = function(_) {
    return arguments.length ? (nodes = _, force) : nodes;
  };

  return force;
}