import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SharedService} from "../shared/shared.service";
import {UserService} from "../authentication/user.service";
import {ICLOTHES} from "../shared/interfaces/ICLOTHES";
import {ICLOTHSENUMS} from "../shared/interfaces/ICLOTHSENUMS";

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public sharedService: SharedService, public userService: UserService, private renderer2: Renderer2) {
  }

  clothes: ICLOTHES | undefined;
  // clothEnum: ICLOTHSENUMS | undefined;
  // femaleNavigation: string[] | undefined;
  // maleNavigation: string[] | undefined;
  // girlsNavigation: string[] | undefined;
  // boysNavigation: string[] | undefined;

  currentPageNumber: number = 0;
  totalPages: number = 1;

  womenNav: boolean = false;
  menNav: boolean = false;
  girlsNav : boolean = false;
  boysNav : boolean = false;

  showPriceFilter: boolean = false;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({who}) => {
      if (who === 'men') {
        this.falseAll();
        this.menNav = true;
        this.getAllOrSpecificClothes({pageSize: 1,
          sex:this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE': ''});

      } else if (who === 'women') {
        this.falseAll();
        this.womenNav = true;
        this.getAllOrSpecificClothes({pageSize: 1,
          sex:this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE': ''});
      }
    });

    // this.getAllOrSpecificClothes({pageSize: 1});

    // this.userService.getAllClothesEnumsForFields();
  }



  getAllOrSpecificClothes(
    data?: {
      pageNo?: number,
      pageSize?: number,
      brand?: string,
      size?: string,
      discount?: number,
      color?: string,
      priceLow?: number,
      priceHigh?: number,
      sortBy?: string,
      sex?: string,
      type?: string[]
    }
  ): void {

    this.userService
      .getClothesBySpecificValue({
        pageNo: data?.pageNo != undefined ? data!.pageNo : -1,
        pageSize: data?.pageSize != undefined ? data!.pageSize : -1,
        brand: data?.brand != undefined ? data!.brand : '',
        size: data?.size != undefined ? data!.size : '',
        discount: data?.discount != undefined ? data!.discount : -1,
        color: data?.color != undefined ? data!.color : '',
        priceLow: data?.priceLow != undefined ? data!.priceLow : -1,
        priceHigh: data?.priceHigh != undefined ? data!.priceHigh : -1,
        sortBy: data?.sortBy != undefined ? data!.sortBy : '',
        sex: data?.sex != undefined ? data!.sex : '',
        type: data?.type != undefined ? data!.type : Array.of()
      })
      .subscribe({
        next: value => {
          this.clothes = value;
          this.totalPages = value.totalPages === 0 ? 1 : value.totalPages;
          this.currentPageNumber = value.pageable.pageNumber;

        },
        error: err => {
          this.sharedService
            .showAlertMsg
            .error(err)
        },
        complete: () => {
          this.changeCurrentPageNumberBox()
        }
      });
  }

  // filterClothesType(gender: string): string[] {
  //   let arrayNav: string[] = [];
  //   this.clothEnum
  //     ?.clothType.filter((value: string) => {
  //     let strings = value.split("=");
  //     strings[1].split("/")
  //       .forEach(value1 => {
  //         if (value1 === gender) {
  //           arrayNav.push(this.sharedService.capitalizeFirstLetter(strings[0]));
  //         }
  //
  //       })
  //   })
  //   return arrayNav;
  //
  // }

  //PAGEABLE FUNCTION
  getPreviousPage(paginationNumber: HTMLInputElement): void {
    if (!this.clothes?.first) {
      let data = this.sharedService
        .callDocumentQuerySelectorByString(['#clothes-colors',
          '#clothes-discounts',
          '#clothes-size',
          '#clothes-brand']);

      data['pageNo'] = this.currentPageNumber - 1;
      data['pageSize'] = 1;
      data['sex'] = this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE': '';

      this.getAllOrSpecificClothes(data);
      this.sharedService
        .scrollTop();
    }
  }

  getNextPage(paginationNumber: HTMLInputElement): void {
    if (!this.clothes?.last) {

      let data = this.sharedService
        .callDocumentQuerySelectorByString(['#clothes-colors',
          '#clothes-discounts',
          '#clothes-size',
          '#clothes-brand']);

      data['pageNo'] = this.currentPageNumber + 1;
      data['pageSize'] = 1;
      data['sex'] = this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE': '';

      this.getAllOrSpecificClothes(data);
      this.sharedService
        .scrollTop();
    }
  }

  paginationCustomNumber(paginationCustomNumber: HTMLInputElement): void {

    if (this.totalPages >= parseInt(paginationCustomNumber.value) && parseInt(paginationCustomNumber.value) > 0 && paginationCustomNumber.value[0] != '0') {

      let data = this.sharedService
        .callDocumentQuerySelectorByString(['#clothes-colors',
          '#clothes-discounts',
          '#clothes-size',
          '#clothes-brand']);

      data['pageNo'] = parseInt(paginationCustomNumber.value) - 1;
      data['pageSize'] = 1;
      data['sex'] = this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE': '';

      this.getAllOrSpecificClothes(data);
      this.currentPageNumber = parseInt(paginationCustomNumber.value);
      this.sharedService.scrollTop();

    } else {
      this.sharedService
        .showAlertMsg
        .error("Page begin from 1 ,  Total pages are " + this.totalPages + ", So  you can't get below or get over.");
    }
  }

  changeCurrentPageNumberBox(): void {
    let selectRootElement = this.renderer2.selectRootElement("#pagination-number-input");
    selectRootElement.value = this.currentPageNumber + 1;

  }

  filterChangedDetect() {
    let data = this.sharedService
      .callDocumentQuerySelectorByString(['#clothes-colors',
        '#clothes-discounts',
        '#clothes-size',
        '#clothes-brand',
        '#women-cloth-nav',
        '#men-cloth-nav']);
    data['pageSize'] = 1;
    data['sex'] = this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE': this.girlsNav ? 'GIRLS' : this.boysNav ? 'BOYS' : new DOMException("SEX is not selected!");
    this.getAllOrSpecificClothes(data);
  }

  //PAGEABLE FUNCTION

  calculatePercentOfDiscount(oldPrice: number, newPrice: number): number {
    return ((oldPrice - newPrice) / oldPrice) * 100;
  }

  falseAll(): void {
    this.womenNav = false;
    this.menNav = false;
  }

  getWomenNav(): boolean {
    return this.womenNav;
  }

  getMenNav(): boolean {
    return this.menNav;
  }


  // private getAllClothesEnumsForFields(): void {
  //   this.userService
  //     .getAllFieldsForClothes()
  //     .subscribe({
  //       next: value => {
  //         this.userService.clothEnum = value;
  //       },
  //       error: err => {
  //         this.sharedService
  //           .showAlertMsg
  //           .error(err)
  //       },
  //       complete: () => {
  //         this.userService.femaleNavigation = this.userService.filterClothesType('FEMALE');
  //         this.userService.maleNavigation = this.userService.filterClothesType('MALE');
  //         this.userService.girlsNavigation = this.userService.filterClothesType('GIRLS');
  //         this.userService.boysNavigation = this.userService.filterClothesType('BOYS');
  //       }
  //     })
  // }

}
