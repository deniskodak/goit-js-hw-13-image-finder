export default function pnotifyMessage(alert, message) {
    
    return alert({
        text: `${message}`,
        delay: 2000,
    })
}
