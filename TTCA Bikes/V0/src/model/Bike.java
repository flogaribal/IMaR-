package model;

public class Bike {
	
	//Incredible fields
	private int id;
	private boolean used;
	private boolean damaged;
	
	
	//Amazing constructor
	public Bike(int id, boolean used, boolean damaged) {
		super();
		this.id = id;
		this.used = used;
		this.damaged = damaged;
	}
	
	

	//Is the bike used ?
	public boolean isUsed() {
		return used;
	}
	public void setUsed(boolean used) {
		this.used = used;
	}

	
	//Damage state of the bike
	public boolean isDamaged() {
		return damaged;
	}
	public void setDamaged(boolean damaged) {
		this.damaged = damaged;
	}
	
	
}
