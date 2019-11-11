CREATE TABLE products (
    prodId INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    subCat TEXT,
    name TEXT NOT NULL,
    description TEXT,
    mainPhotos TEXT,
    banner TEXT
);

CREATE TABLE productDrawing (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    product NUMBER,
    drawing NUMBER,
    FOREIGN KEY
(product) REFERENCES products
(prodId),
    FOREIGN KEY
(drawing) REFERENCES drawings
(drawingId)
);

CREATE TABLE productProjects (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    product NUMBER,
    project NUMBER,
    FOREIGN KEY
(product) REFERENCES products
(prodId),
    FOREIGN KEY
(project) REFERENCES project
(projId)
);



CREATE TABLE photos (
 photoId INTEGER PRIMARY KEY AUTOINCREMENT,
 source TEXT
);

CREATE TABLE productPhotos (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    product NUMBER,
    photo NUMBER,
    FOREIGN KEY
(product) REFERENCES products
(prodId),
    FOREIGN KEY
(photo) REFERENCES photos
(photoId)
);


CREATE TABLE projectPhotos (
    _id INTEGER PRIMARY KEY AUTOINCREMENT,
    project NUMBER,
    photo NUMBER,
    FOREIGN KEY
(project) REFERENCES projects
(projId),
    FOREIGN KEY
(photo) REFERENCES photos
(photoId)
);



CREATE TABLE projects (
 projId INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 description TEXT
);



CREATE TABLE drawings (
 drawingId INTEGER PRIMARY KEY AUTOINCREMENT,
 source TEXT,
 name TEXT
);



CREATE TABLE users (
    UserId INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    pasword TEXT
);


INSERT INTO products
    (category, subCat, name, description, mainPhotos)
VALUES
    ("doors", "aluminium_doors", "alu doors", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Tortor at risus viverra adipiscing at in tellus. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam. Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Enim sit amet venenatis urna cursus eget nunc. Tellus at urna condimentum mattis pellentesque. Vivamus arcu felis bibendum ut tristique et egestas. Consequat interdum varius sit amet. Proin nibh nisl condimentum id venenatis a condimentum. Faucibus nisl tincidunt eget nullam non. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Consectetur lorem donec massa sapien faucibus et. Et netus et malesuada fames ac turpis egestas. Parturient montes nascetur ridiculus mus.\n\nUrna porttitor rhoncus dolor purus. Eu lobortis elementum nibh tellus molestie nunc non blandit. Praesent elementum facilisis leo vel fringilla. Et magnis dis parturient montes nascetur ridiculus mus mauris. Eleifend mi in nulla posuere sollicitudin aliquam. Ornare suspendisse sed nisi lacus sed viverra tellus in. Egestas dui id ornare arcu. Et molestie ac feugiat sed. Ac auctor augue mauris augue neque `gr`avida in fermentum et. Et leo duis ut diam quam nulla porttitor massa. Sed elementum tempus egestas sed. Praesent tristique magna sit amet purus gravida.", "/images/901113_aluminium_crittall_doors_022.JPG");