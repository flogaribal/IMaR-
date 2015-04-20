package io;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import data.Action;
import data.Scenario;

/**
 * Class used to launch the application
 * @author Group C ReconfMI
 * @version 1.0
 */
public class ScenariosLoader {
	
	/**
	 * Method used to load Scenario from an XML file
	 * @param anXMLFile
	 * @return Scenario
	 * @throws Exception
	 */
	public static Scenario loadFromXML(File anXMLFile) throws Exception {

		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		Document doc = dBuilder.parse(anXMLFile);
		doc.getDocumentElement().normalize();
		
		if (!doc.getDocumentElement().getNodeName().equals("scenario")) {
			throw new Exception("Error: not a valid scenario");
		}
		
		String scenarioName = "";
		Node nameNode = doc.getElementsByTagName("name").item(0);
		if (nameNode.getNodeType() == Node.ELEMENT_NODE) {
			Element nameElement = (Element) nameNode;
			scenarioName = nameElement.getTextContent().trim();
		} else {
			throw new Exception("Error: scenario doesn't have any name");
		}

		NodeList events = doc.getElementsByTagName("log").item(0).getChildNodes();
		int eventsAmount = events.getLength();
		List<Element> logEvents = new ArrayList<Element>();
		for(int n = 0; n < eventsAmount; n++){
			Node eventNode = events.item(n);
			if(eventNode instanceof Element && ((Element)eventNode).getTagName().equals("evenement")){
				logEvents.add((Element) eventNode);
			}
		}

		ArrayList<Action> scenarioActions = new ArrayList<Action>();
		NodeList actionsNodeList = doc.getElementsByTagName("actions").item(0).getChildNodes();
		String titre ="";
		String alt ="";
		for (int i = 0; i < actionsNodeList.getLength(); i++) {
			Node currentActionNode = actionsNodeList.item(i);
			if (currentActionNode.getNodeName().equals("action")) {
				NodeList childs = currentActionNode.getChildNodes();
				for(int n = 0; n < childs.getLength(); n++){
					if(childs.item(n).getNodeName().equals("titre")){
						titre = childs.item(n).getTextContent().trim();
					}
					if(childs.item(n).getNodeName().equals("alt")){
						alt = childs.item(n).getTextContent().trim();
					}
				}
				scenarioActions.add(new Action(titre, alt));
				titre = "";
			}
		}
		return  new Scenario(scenarioName, logEvents.toArray(new Element[logEvents.size()]), scenarioActions.toArray(new Action[scenarioActions.size()]));
   
  }
}
