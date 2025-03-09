console.log("Welcome to Riffly");
let songIndex = 0;
let audioElement = new Audio(`songs/${songIndex+1}.mp3`);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let volumeIcon = document.getElementById('volumeIcon');
let repeat = document.getElementById('repeat');
let shuffle = document.getElementById('shuffle');

let songs = [
    {songName: "Chaleya", artistName: " - Arijit Singh", filePath: "../songs/1.mp3", coverPath: "../images/covers/1.jpg"},
    {songName: "One Love", artistName: " - Shubh", filePath: "../songs/2.mp3", coverPath: "../images/covers/2.jpg"},
    {songName: "Heeriye", artistName: " - Arijit Singh", filePath: "../songs/3.mp3", coverPath: "../images/covers/3.jpg"},
    {songName: "Naacho Naacho", artistName: " - Rahul Sipligunj and Vishal Mishra", filePath: "../songs/4.mp3", coverPath: "../images/covers/4.jpg"},
    {songName: "Manike", artistName: " - Jubin Nautiyal,and Yohani", filePath: "../songs/5.mp3", coverPath: "../images/covers/5.jpg"},
    {songName: "With You", artistName: " - AP Dhillon", filePath: "../songs/6.mp3", coverPath: "../images/covers/6.jpg"},
    {songName: "Khairiyat", artistName: " - Arijit Singh", filePath: "../songs/7.mp3", coverPath: "../images/covers/7.jpg"},
    {songName: "Raataan Lambiyan", artistName: " - Jubin Nautiyal and Tanishk Bagchi", filePath: "../songs/8.mp3", coverPath: "../images/covers/8.jpg"},
    {songName: "Apna Bana Le", artistName: " - Arijit Singh", filePath: "../songs/9.mp3", coverPath: "../images/covers/9.jpg"},
    {songName: "Ram Siya Ram", artistName: " - Ajay-Atul", filePath: "../songs/10.mp3", coverPath: "../images/covers/10.jpg"}

]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName ; 
})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
    })
}
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress ; 
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100 ; 
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName + songs[songIndex].artistName;
        audioElement.currentTime = 0 ;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    gif.style.opacity = 1;
    if(songIndex>=9){
        songIndex=0 ; 
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName + songs[songIndex].artistName;
    audioElement.currentTime = 0 ;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    gif.style.opacity = 1;
    if(songIndex<=0){
        songIndex=9 ; 
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName + songs[songIndex].artistName;
    audioElement.currentTime = 0 ;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

audioElement.addEventListener("timeupdate", function(){
    const currentTime = audioElement.currentTime ;
    const totalTime = audioElement.duration ; 
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById('timer').textContent = formattedTime ;
    if(currentTime<0.05){
        document.getElementById('duration').textContent = "00:00" ;
    }
    else{
    document.getElementById('duration').textContent = Math.floor(totalTime/60) + ":" + Math.floor(totalTime%60) ;
    }
});

audioElement.addEventListener("ended", function(){
    if(!audioElement.classList.contains('shuffled')){
        if(songIndex<9){
            songIndex += 1 ;
        }
        else {
            songIndex = 0;
        }
    }
    else{
       songIndex = Math.floor(Math.random()*10);
    }
    audioElement.src = `songs/${songIndex+1}.mp3` ;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName + songs[songIndex].artistName;
});

document.addEventListener("DOMContentLoaded", function() {
    var audio = audioElement;
    var slider = document.getElementById("slider");
    audio.volume = slider.value;
    slider.addEventListener("input", function() {
        audio.volume = slider.value ; 
        if(slider.value<0.5 && slider.value!=0){
            volumeIcon.classList.remove("fa-volume-high");
            volumeIcon.classList.remove("fa-volume-mute");
            volumeIcon.classList.add("fa-volume-low");
            }
        else if(slider.value==0){
            volumeIcon.classList.remove("fa-volume-low");
            volumeIcon.classList.remove("fa-volume-high");
            volumeIcon.classList.add("fa-volume-mute");
        }
        else {
            volumeIcon.classList.remove("fa-volume-low");
            volumeIcon.classList.remove("fa-volume-mute");
            volumeIcon.classList.add("fa-volume-high");
        }
        
    })
  
})

repeat.addEventListener('click',()=>{
    repeat.style.color = repeat.style.color === 'grey' ? 'white' : 'grey';
})

function toggleRepeat(){
    audioElement.loop = !audioElement.loop ;
}

shuffle.addEventListener('click',()=>{
    shuffle.style.color = shuffle.style.color === 'grey'? 'white' : 'grey';
    shufflesong(audioElement);
})

function shufflesong(song){
song.classList.contains('shuffled') ? song.classList.remove('shuffled') : song.classList.add('shuffled');
}


    




