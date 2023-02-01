const OFFLINE = 0 ;
const ONLINE = 1 ;
const MOBILE = 2 ;
let mode = MOBILE ;

let address = ""
if(mode === ONLINE){
    address = 'https://teachgram.000webhostapp.com/teachgram/0_main.php'
}else if(mode === OFFLINE)
{    address = 'http://localhost/teachgram/0_main.php'

}else if(mode===2)
    address = 'http://192.168.185.149/teachgram/0_main.php'










export {address}