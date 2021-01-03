# Models

Typescript interfaces and database object classes. These are the things that manage objects, but they do not communicate with outside services.
Also miscellaneous things like the constants file

# Controllers

Main modules for handling and routing database objects. Create, Edit, and Delete functions to handle Images, Tags, Artists, etc.
These are the bits that connect models to services

# Services

The bits that communicate with outside services. SQL calls and database connections, Image uploads, pubsub messages, things like that

# Router

Just the router. Keep it separate from the main app file because it might get huge. Might end up making more than one if theres a need for that