import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{f,i as c}from"./assets/vendor-651d7991.js";const n=document.querySelector("[data-start]"),a=document.querySelector("#datetime-picker"),y=document.querySelector("[data-days]"),p=document.querySelector("[data-hours]"),v=document.querySelector("[data-minutes]"),S=document.querySelector("[data-seconds]");let o=null;const I={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){o=t[0];const e=new Date;o.getTime()<=e.getTime()?(n.disabled=!0,c.error({title:"Error",message:"Please choose a date in the future!",position:"topRight"})):(n.disabled=!1,c.success({title:"OK!",message:"You can press Start!",position:"center"}))}};f(a,I);const b={timerInterval:null,start(){!o||this.timerInterval||(a.disabled=!0,this.timerInterval=setInterval(()=>{const t=Date.now(),e=o-t;if(e<=0)clearInterval(this.timerInterval),this.timerInterval=null,d({days:0,hours:0,minutes:0,seconds:0}),a.disabled=!1,n.disabled=!1;else{const r=g(e);d(r)}},1e3))}};n.addEventListener("click",()=>{n.disabled=!0,o&&b.start()});function g(t){const u=s(Math.floor(t/864e5)),l=s(Math.floor(t%864e5/36e5)),m=s(Math.floor(t%864e5%36e5/6e4)),h=s(Math.floor(t%864e5%36e5%6e4/1e3));return{days:u,hours:l,minutes:m,seconds:h}}function s(t){return String(t).padStart(2,"0")}function d({days:t,hours:e,minutes:r,seconds:i}){y.textContent=t,p.textContent=e,v.textContent=r,S.textContent=i}
//# sourceMappingURL=commonHelpers.js.map