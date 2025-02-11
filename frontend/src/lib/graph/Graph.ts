import Graph from "graphology"
import Sigma from "sigma"
import contacts from "$lib/contacts/Contacts";
import type { Contact, UUID } from "$lib/contacts/Contact";

export let graph : Graph
export let sigmaInstance : Sigma;

let highlightedNode : string|null = null;

export function createGraph(containerElem : HTMLDivElement) {
    graph = new Graph(); 
    graph.addNode("You", {label: "You", x: 0, y: 0, size: 10, color: "blue"});
    
    contacts.forEach((contact, uuid) => {
        graph.addNode(uuid, {x: Math.random()*5, y: Math.random()*5, label: contact.name, color: "black", size: 10})
    })

    contacts.forEach((contact, uuid) => {
        for (const relation of contact.relations) {
            graph.addDirectedEdge(uuid, relation, {color: "black", size: 5, type: "arrow"});
        }
    })

    sigmaInstance = new Sigma(graph, containerElem)
}

export function removeConnection(fromUUID : UUID, toUUID : UUID) {
    if (graph.hasDirectedEdge(fromUUID, toUUID)) {
        graph.dropDirectedEdge(fromUUID, toUUID);
    }
}

export function removeContact(contact : Contact) {
    if (graph.hasNode(contact.uuid)) {
        graph.dropNode(contact.uuid);
    }
}

export function addContact(contact : Contact) {
    graph.addNode(contact.uuid, {x: Math.random()*5, y: Math.random()*5, label: contact.name, size: 10, color: "black"})
}

export function highlightContact(contact : Contact|null) {
    if (highlightedNode) graph.removeNodeAttribute(highlightedNode, "highlighted");
    highlightedNode = contact ? contact.uuid : null;
    
    if (highlightedNode) {
        graph.setNodeAttribute(highlightedNode, "highlighted", true);
        const nodeData = sigmaInstance.getNodeDisplayData(highlightedNode)
        if (nodeData) {
            sigmaInstance.getCamera().animate({x: nodeData.x - 0.05, y: nodeData.y, ratio: 0.25})
        }
    }
}

export function updateContact(contact : Contact) {
    if (graph.getNodeAttribute(contact.uuid, "label") != contact.name) {
        graph.setNodeAttribute(contact.uuid, "label", contact.name);
    }

    contacts.forEach((contact, uuid) => {
        for (const relation of contact.relations) {
            if (!graph.hasDirectedEdge(uuid, relation)) {
                graph.addDirectedEdge(uuid, relation, {color: "black", size: 5, type: "arrow"});
            }
        }
    })
    // const connectedEdges : string[] = graph.outboundEdges(contact.uuid);
    // console.log(connectedEdges);
}