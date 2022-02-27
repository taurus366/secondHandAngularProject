import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {interval} from "rxjs";

@Directive({
  selector: '[appAlertMessagesGenerator]'
})
export class AlertMessagesGeneratorDirective implements OnInit{

  constructor(private renderer2 : Renderer2, private el:ElementRef) { }

  ngOnInit(): void {
    this.error("1");
    // this.error("2");
    // this.error("3");
    // this.error("4");

    // setInterval(() => {
    //   this.error("test");
    //   // this.interval();
    // }, 2000);
  }







  error(message:string) {
    let classesArticle = ['flash-message-error'];
    let article =  this.renderer2.createElement("article");
    for (const iconElement of classesArticle) {
      this.renderer2.addClass(article,iconElement);
    }

    let classesIcon = ['far','fa-times-circle','error-icon'];
    let icon = this.renderer2.createElement("i");
    for (const iconElement of classesIcon) {
      this.renderer2.addClass(icon,iconElement);
    }

    let classesP = ['error-text'];
    let p = this.renderer2.createElement("p");
    for (const pElement of classesP) {
      this.renderer2.addClass(p,pElement);
    }

    let strong = this.renderer2.createElement("strong");
    this.renderer2.appendChild(strong,this.renderer2.createText("ERROR! "))

    let classesSpan = ['error-user-message'];
    let text = this.renderer2.createText(message);
    let span = this.renderer2.createElement("span");
    this.renderer2.appendChild(span,text);
    for (const spanElement of classesSpan) {
      this.renderer2.addClass(span,spanElement);
    }

    let classesBtnI = ['fa','fa-times','error-message-btn'];
    let btnI = this.renderer2.createElement("i");
    for (const elBtnI of classesBtnI) {
      this.renderer2.addClass(btnI,elBtnI);
    }



    this.renderer2.appendChild(article,icon);
    this.renderer2.appendChild(p,strong);
    this.renderer2.appendChild(p,span);

    this.renderer2.appendChild(article,p);
    this.renderer2.appendChild(article,btnI);
    this.renderer2.appendChild(this.el.nativeElement,article);

    this.renderer2.listen(btnI,'click', ()=>{
      this.renderer2.removeChild(this.el.nativeElement,article);
    });

    setTimeout(() => {
     if (this.el.nativeElement.contains(article)){
       this.renderer2.removeChild(this.el.nativeElement,article);
     }
    },8000);
  }

}
