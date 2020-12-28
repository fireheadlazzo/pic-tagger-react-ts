# Data Models

Generally speaking, a data model that corresponds to a database table will be the most functional with the others being simple exported interfaces. Each database table should have a corresponding data model that accounts for all of the table columns.

## Style Choices

The coding style for most of the project will be to use camel case for everything, but for ease-of-use when writing to the database, table data models are written in snake case. I might change this later if it becomes a problem, but I'm not too concerned about it