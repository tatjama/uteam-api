create database 'uteamapi';
use uteamapi;

create table users(
    id unique int unsigned not null auto_increment primary key,
    username unique VARCHAR(128) not null,
    email unique VARCHAR(128) not null,
    password VARCHAR(128) not null,
    role enum not null,
);

create table profiles(
    id unique int unsigned not null auto_increment primary key,
    name unique VARCHAR(128) not null,
    profilePhoto VARCHAR(255) not null,
    status enum not null,
    userId unique int unsigned not null foreign key(userId) references users,
);    

create table companies (
    id unique int unsigned not null auto_increment primary key,
    name unique VARCHAR(128) not null,
    logo VARCHAR(255) not null,
    companyOwner unique int unsigned not null foreign key(companyOwner) references users,
    createdAt datetime not null,
    updatedAt datetime not null
);
     