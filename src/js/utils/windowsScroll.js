export default function windowsScrolling() {
    const totalScrollHeight = document.body.clientHeight;
  
 window.scrollTo({
  top: totalScrollHeight * 0.6,
  left: 0,
  behavior: 'smooth',
 });
  console.log(totalScrollHeight  * 0.6);
}