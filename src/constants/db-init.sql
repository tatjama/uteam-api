create database 'uteamapi';
use uteamapi;

create table users(
    id int auto_increment primary key,
    username text not null,
    email text not null,
    password text not null,
);

create table profiles(
    id int auto_increment primary key,
    name text not null,
    profilePhoto url not null,
    status enum not null,
    userId int not null foreign key(userId) references users,
);