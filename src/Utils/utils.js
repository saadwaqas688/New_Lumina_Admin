export function getBasePath(url){
    let parts=url.split("/");
    return  parts[1]
}


export function convertTimeStampToTime(date){
    return(
               date.getDate()+
             "/"+(date.getMonth()+1)+
             "/"+date.getFullYear()+
             " "+date.getHours()+
             ":"+date.getMinutes()+
             ":"+date.getSeconds()
    )
   }