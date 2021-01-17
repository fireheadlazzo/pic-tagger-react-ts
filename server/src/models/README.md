# Data Models

Generally speaking, a data model that corresponds to a database table will be the most functional with the others being simple exported interfaces. Each database table should have a corresponding data model that accounts for all of the table columns.

## Interfaces

Purely a place to hold custom typescript interfaces. Nothing functional should go here

## Objs

Holds the core class objects that get written to the database. Images, Tags, and Artists go here.
Most of these classes should be roughly equal to each other to keep them working in the same way

# Style Choices

The coding style for most of the project will be to use camel case for everything, but for ease-of-use when writing to the database, table data models are written in snake case. I might change this later if it becomes a problem, but I'm not too concerned about it