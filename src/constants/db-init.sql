create database 'uteamapi';
use uteamapi;

create table users(
id int auto_increment primary key,
username text not null,
email text not null,
password text not null,
);