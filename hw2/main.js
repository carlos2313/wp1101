const animal_album = ["https://i.natgeofe.com/k/33b1ce67-e8a9-4f8c-82b0-04abd8cb20d1/american-alligator-jaws.jpg?w=954&h=537",
                        "https://i.natgeofe.com/k/c02b35d2-bfd7-4ed9-aad4-8e25627cd481/komodo-dragon-head-on_2x1.jpg",
                        "https://i.natgeofe.com/k/3892766d-ad0e-4027-9cca-a03708fcd1e6/beaver-closeup.jpg?w=954&h=537",
                        "https://i.natgeofe.com/k/042ca106-04fc-49f5-b679-35030219651b/beluga-whale-underewater-closeup-teeth.jpg?w=954&h=537",
                        "https://i.natgeofe.com/k/34e8d6f4-ab08-4c23-9265-7761960e0e0e/brown-bear-fish-stream.jpg?w=954&h=537"
];

const nature_album = ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1280px-Shaqi_jrvej.jpg",
                        "https://static01.nyt.com/images/2020/12/10/travel/10europe-02/10europe-02-superJumbo.jpg?quality=75&auto=webp",
                        "https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2019/07/23090714/nature-1024x682.jpeg",
                        "https://upload.wikimedia.org/wikipedia/commons/5/57/Galunggung.jpg",
                        "https://upload.wikimedia.org/wikipedia/commons/8/89/Expn7398_%2839695069782%29.jpg"
];

const cat_album = ["https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
                    "https://worldbirds.com/wp-content/uploads/2020/05/cat-symbolism8.jpg",
                    "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg",
                    "https://images.moneycontrol.com/static-mcnews/2020/04/cat-770x433.jpg?impolicy=website&width=770&height=431",
                    "https://images2.minutemediacdn.com/image/upload/c_crop,h_1350,w_2400,x_0,y_59/v1628778532/shape/mentalfloss/87226-gettyimages-1247734973.jpg?itok=qBoDBIYv"
];

const albums = {"animal_album": 0, "nature_album":1, "cat_album":2};
const albumsName = ["animal_album", "nature_album", "cat_album"];
const allAlbum = [animal_album, nature_album, cat_album];

let currentAlbumIndex = 0, currentPhotoIndex = 0;
let displayImg = document.getElementById("mainphoto");
let previewImgs = [document.getElementById("previewphoto1"),
                document.getElementById("previewphoto2"),
                document.getElementById("previewphoto3"),
                document.getElementById("previewphoto4"),
                document.getElementById("previewphoto5")];

setAlbum("animal_album");
setImg(currentPhotoIndex);
setpreviewImgs();
highlight(currentPhotoIndex);

function setAlbum(name){
    document.getElementById(albumsName[currentAlbumIndex]).style.cssText = "";
    currentAlbumIndex = albums[name];
    document.getElementById(name).style.cssText = "background-color:bisque; width: 30%; color:rgb(201, 197, 152);";
    setImg(0);
    setpreviewImgs();
}

function setImg(index){
    displayImg.src = allAlbum[currentAlbumIndex][index];
}

function setpreviewImgs(){
    for(var i=0;i<previewImgs.length;i++){
        previewImgs[i].src = allAlbum[currentAlbumIndex][i];
    }
}

function highlight(index){
    document.getElementById("previewphoto"+(currentPhotoIndex+1)).style.border = "";
    document.getElementById("previewphoto"+(index+1)).style.border = "3px solid black";
    currentPhotoIndex = index;
    setImg(currentPhotoIndex);
}

function emptymessage(){
    window.alert("This is an empty album");
}

