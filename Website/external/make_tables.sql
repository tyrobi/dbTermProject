-- Create all tables from scratch

SET FOREIGN_KEY_CHECKS = 0;
drop table if exists tj_robinson.hoursPerDay;
drop table if exists tj_robinson.hourPerYear;
drop table if exists tj_robinson.salaries;
drop table if exists tj_robinson.pay;
drop table if exists tj_robinson.hrEmployee;
drop table if exists tj_robinson.asEmployee;
drop table if exists tj_robinson.employee;
drop table if exists tj_robinson.customer;
drop table if exists tj_robinson.transaction;
drop table if exists tj_robinson.forSale;
drop table if exists tj_robinson.suppliers;
drop table if exists tj_robinson.licenses;
drop table if exists tj_robinson.phoneNumbers;
drop table if exists tj_robinson.monthlyExpenses;
drop table if exists tj_robinson.orders;
drop table if exists tj_robinson.boughtPart;
drop table if exists tj_robinson.parts;
drop table if exists tj_robinson.repairs;
drop table if exists tj_robinson.cars;
SET FOREIGN_KEY_CHECKS = 1;

create table if not exists parts
(
  partId int not null,
  qty int,
  price double(10,2),
  description varchar(50),
  primary key (partId)
) engine = innodb;

create table if not exists suppliers
(
  supplierId int not null auto_increment,
  name varchar(30),
  email varchar(50),
  primary key (supplierId)
) engine = innodb;

create table if not exists repairs
(
  repairNum int not null,
  cost double(10,2),
  filed date,
  primary key (repairNum)
) engine = innodb;

create table if not exists cars
(
  carId int not null auto_increment,
  color varchar(50),
  make varchar(20),
  model varchar(20),
  year year,
  type varchar(20),
  primary key (carId)
) engine = innodb;

create table if not exists licenses
(
  plateNum varchar(10) not null,
  province varchar(2) not null,
  carId int not null references tj_robinson.cars(carId) on update cascade on delete cascade,
  primary key (plateNum, province)
) engine = innodb;

create table if not exists phoneNumbers
(
  supplierId int not null,
  phoneNumber varchar(20),
  foreign key(supplierId) references tj_robinson.suppliers(supplierId) on update cascade on delete cascade,
  primary key (phoneNumber)
) engine = innodb;

create table if not exists orders
(
  orderId int not null auto_increment,
  supplierId int not null,
  dateFiled date,
  foreign key(supplierId) references tj_robinson.suppliers(supplierId) on update cascade on delete cascade,
  primary key (orderId)
) engine = innodb;

create table if not exists boughtPart
(
  partPurchaseId int not null auto_increment,
  orderId int not null,
  partId int not null,
  foreign key(orderId) references tj_robinson.orders(orderId) on update cascade on delete cascade,
  foreign key(partId) references tj_robinson.parts(partId) on update cascade on delete cascade,
  primary key (partPurchaseId)
) engine = innodb;

create table if not exists customer
(
  customerNum int not null auto_increment,
  firstName varchar(20) not null,
  lastName varchar(20) not null,
  phoneNumber varchar(20),
  otherNumber varchar(20),
  address varchar(50),
  primary key(customerNum)
) engine = innodb;

create table if not exists transaction
(
  transactionNumber int not null auto_increment,
  dateCompleted date,
  custId int not null,
  charged double(10,2),
  plateNum varchar(10) not null,
  province varchar(2) not null,
  foreign key(custId) references tj_robinson.customer(customerNum) on update cascade on delete cascade,
  foreign key(plateNum, province) references tj_robinson.licenses(plateNum, province) on update cascade on delete cascade,
  primary key(transactionNumber)
) engine = innodb;

create table if not exists forSale
(
  saleNumber int not null,
  price double(10,2),
  kilometres double(16,1),
  lastTransaction int not null,
  carId int not null,
  repairNum int not null,
  foreign key(carId) references tj_robinson.cars(carId) on update cascade on delete cascade,
  foreign key(repairNum) references tj_robinson.repairs(repairNum) on update cascade on delete cascade,
  foreign key(lastTransaction) references tj_robinson.transaction(transactionNumber) on update cascade on delete cascade,
  primary key(saleNumber)
) engine = innodb;

create table if not exists employee
(
  sin int not null,
  customerNum int not null,
  started date,
  jobDesc varchar(40),
  terminationDate date,
  foreign key(customerNum) references tj_robinson.customer(customerNum) on update cascade on delete cascade,
  primary key(sin)
) engine = innodb;

create table if not exists hrEmployee
(
  hrId int auto_increment not null,
  sin int not null,
  foreign key(sin) references tj_robinson.customer(customerNum) on update cascade on delete cascade,
  primary key(hrId)
) engine = innodb;

create table if not exists pay
(
  changeId int auto_increment not null,
  hrId int not null,
  rate double(4,2),
  startPeriod date not null,
  endPeriod date,
  foreign key(hrId) references tj_robinson.hrEmployee(hrId) on update cascade on delete cascade,
  primary key(changeId)
) engine = innodb;

create table if not exists hours
(
  timeEntry int auto_increment not null,
  hrId int not null,
  started datetime not null,
  ended datetime not null,
  foreign key(hrId) references tj_robinson.hrEmployee(hrId) on update cascade on delete cascade,
  primary key(timeEntry)
) engine = innodb;

create table if not exists asEmployee
(
  asId int auto_increment not null,
  sin int not null,
  foreign key(sin) references tj_robinson.customer(customerNum) on update cascade on delete cascade,
  primary key(asId)
) engine = innodb;

create table if not exists salaries
(
  salaryId int not null auto_increment,
  asId int not null,
  year year,
  salary double(8,2),
  foreign key(asId) references tj_robinson.asEmployee(asId) on update cascade on delete cascade,
  primary key(salaryId)
) engine = innodb;

create table if not exists monthlyExpenses
(
  expenseId date not null,
  electric double(20,2) default 0,
  heat double(20,2) default 0,
  water double(20,2) default 0,
  rent double(20,2) default 0,
  primary key(expenseId)
) engine = innodb;

