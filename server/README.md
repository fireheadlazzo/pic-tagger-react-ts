
# pic-tagger-v2 node server

## Description

Built to emulate the first picture tagging system, but with two extra years of programming experience to pull from. This server manages the uploading, retrieval, and management of user media. This can include pictures, animated images, and potentially video.
Images are categorized using tags that describe the images visual contents. For instance, a family photo taken at a pumpkin patch might be tagged with `family, holiday, halloween, pumpkin, 2005, outdoors, clouds, smile, group_photo`. After applying tags to an image, the user is able to search for images based on combinations of tags. They can search for all `family` tags to retrieve all images with a family in it, or `outdoors 2005` to search for all pictures taken in 2005 that are outdoors.

## Features

### Tags

Every image uploaded should have a list of tags associated with it, and every tags should have a corresponding list of images that it applies to. Tags are meant to be as easy to manage as possible, as applying tags to an image is the most labor-intansive portion of the categorization process. To alleviate this burden, a few systems can be set up to add and fix tags automatically.

#### Tag Implications

A tag implication is a preset acknowledgement that one tag will always be accompanied by at least one other tag. For instance, the tag `underwater` implies the existence of `water` and `forest` implies `plant`, `tree` and `nature`. Setting up smart implications can potentially add a large number of relevant tags that the user doesnt have to remember. These tags would ideally compound on each other and build lists of tags from relatively little information.
For instance, with the following implications, a lot of assumptions could be made

``` jack-o-lantern -> pumpkin
jack-o-lantern -> halloween
pumpkin -> squash
pumpkin -> vegetable
squash -> food
halloween -> holiday
```

And if the system detects any of the tags in the first column, it will also apply the tag in the second column.
By adding only the `jack-o-lantern` tag, the system can infer the tags `pumpkin, squash, vegetable, food, holiday`, taking a lot of the responsibility off of the user to add these tags themself.

#### Tag Aliases

With a large library of tags to choose from, the user is going to inevitably forget a few of their own rules. They might accidentally tag a bunch of images with `outside` when all of the previous images have been set up to use `outdoors`. This creates a situation where the same visual element is referred to by two separate labels. Tag aliases exist to convert faulty tags without too much user input.
For instance, the user might notice that many of their images are not consistent and create the following aliases

``` outside -> outdoors
overcast -> cloudy
trees -> tree
frank -> uncle_frank
baking -> cooking
```

And if the system detects any of the tags in the first column, it will be deleted and replaced by the tag in the second column.
This can help to avoid the previous situation where two images are tagged `overcast` and `cloudy` and thus won't appear in the same search.

(things get less detailed after this point)

### Collections

A collection is simply a grouping of arbitrary images defined by the user. Each collection has a set of image IDs with a set order and and an uploader. Only the uploader should be able to add, remove, or reorder images

### Series

A series is functionally identical to a collection except that it is editable by any user with sufficient permission and it might have a different way of displaying. A series is intended to include only images from the same source material, such as a single family trip or photos taken in a museum

## UNDER CONSTRUCTION