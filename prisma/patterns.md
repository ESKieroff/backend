# DO NOT REMOVE THIS FILE
## Orientations and patterns for the creation of the database schema
- use snake_case
- use updated_at
- use created_at
- use active
- use json format for postgres 
- use uuid instead of id - better and essential for data replication and clusterization

For non-boolean fields, try to use string or type (enum) instead of int or character. 
Example:
usertype: 0 or 1 use=> usertype: "Admin"
gender: f or m use=> gender: "Female"
group: 0..10 use=>"Vegetables"
