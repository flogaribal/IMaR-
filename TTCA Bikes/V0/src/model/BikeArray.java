package model;

import java.util.ArrayList;

public class BikeArray {
	
	//The array containing the Bikes
	private ArrayList<Bike> bikeList = new ArrayList<Bike>();


	//Add method
	public void add(Bike b) {
		this.bikeList.add(b);
	}
	
	//del method
	public void del(int i) {
		this.bikeList.remove(i);
	}
}
