create database 'uteamapi';
use uteamapi;

create table users(
    id int auto_increment primary key,
    username unique VARCHAR(128) not null,
    email unique VARCHAR(128) not null,
    password VARCHAR(128) not null,
    role enum not null,
);

create table profiles(
    id int auto_increment primary key,
    name VARCHAR(128) not null,
    profilePhoto VARCHAR(255) not null,
    status enum not null,
    UserId int not null unique foreign key(userId) references users,
);