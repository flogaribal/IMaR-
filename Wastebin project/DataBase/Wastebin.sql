create table WasteBin_Type(
	idType INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	typeName VARCHAR(10)
)ENGINE = InnoDB;

create table WasteBin(
	idWasteBin INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	weight INT(4),
	idType INT(6) UNSIGNED, 
	CONSTRAINT FK_WasteBin_WasteBin_Type_idType FOREIGN KEY (idType) REFERENCES WasteBin_Type(idType)
)ENGINE = InnoDB;

create table Address(
	idAddress INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	number INT(4) ,
	street VARCHAR(40),
	city VARCHAR(20) NOT NULL,
	county VARCHAR(17) NOT NULL,
	latitude DECIMAL NOT NULL,
	longitude DECIMAL NOT NULL
);

create table Customer(
	idCustomer INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	firstName VARCHAR(15) NOT NULL,
	lastName VARCHAR(15) NOT NULL,
	dateOfBirth DATE,
	email VARCHAR(20) NOT NULL,
	phoneNumber VARCHAR(17),
	idAddress INT(6) UNSIGNED,
	FOREIGN KEY (idAddress) REFERENCES Address(idAddress)
);

create table WasteBin_Collection_Request(
	idCustomer INT(6) UNSIGNED,
	idWasteBin INT(6) UNSIGNED,
	idAddress INT(6) UNSIGNED,
	dateOfCollection DATE NOT NULL,
	accepted BOOLEAN,
	finished BOOLEAN,
	PRIMARY KEY (idCustomer, idWasteBin),
	FOREIGN KEY (idCustomer) REFERENCES Customer(idCustomer),
	FOREIGN KEY (idWasteBin) REFERENCES WasteBin(idWasteBin)
);