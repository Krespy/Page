import { Component, Input, OnInit } from "@angular/core";
import { Slide } from "./carousel.interface";
import { style, animate, animation, trigger, transition, useAnimation } from "@angular/animations";

@Component({
  selector: "carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
  animations: [
    trigger("slideAnimation", [
     
      /* fade */
      transition("void => fade", [
        useAnimation(animation([
          style({ opacity: 0 }), // start state
          animate(
            "{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
            style({ opacity: 1 })
          )
        ]), { params: { time: "500ms" } })
      ]),
      transition("fade => void", [
        useAnimation(animation([
          animate(
            "{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)",
            style({ opacity: 0 })
          )
        ]), { params: { time: "500ms" } })
      ]),

    ])
  ]
})
export class CarouselComponent implements OnInit {
  @Input() slides: Slide[];
  animationType = "fade"
  @Input() intervalo: number;

  currentSlide = 0;

  constructor() {}


  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

  ngOnInit() {
    this.preloadImages(); // for the demo
    setInterval(() => {
      this.onNextClick();
  }, this.intervalo);
  }

  preloadImages() {
    for (const slide of this.slides) {
      new Image().src = slide.src;
    }
  }

}
