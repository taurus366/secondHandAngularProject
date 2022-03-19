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
  childrenNav: boolean = false; //CHILDREN
  girlsNav: boolean = false; //CHILDREN
  boysNav: boolean = false; //CHILDREN
  shoesNav: boolean = false;
  accessoriesNav: boolean = false;

  //CHILDREN NAV
  showGirlsNavChildren: boolean = false;
  showBoysNavChildren: boolean = false;

  //ACCESSORIES NAV
  showWomenNavAccessories: boolean = false;
  showMenNavAccessories: boolean = false;
  showGirlsNavAccessories: boolean = false;
  showBoysNavAccessories: boolean = false;

  //SHOES NAV
  showWomenNavShoes: boolean = false;
  showMenNavShoes: boolean = false;
  showGirlsNavShoes: boolean = false;
  showBoysNavShoes: boolean = false;


  showPriceFilter: boolean = false;

  //PIPE FILTER
  girlsFilter = {gender:'GIRLS'};
  boysFilter = {gender:'BOYS'};
  womenFilter = {gender:'FEMALE'};
  menFilter = {gender:'MALE'};

  //DEFAULT
  pageSize: number = 1;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({who}) => {
      if (who === 'men') {
        this.falseAll();
        this.menNav = true;

      } else if (who === 'women') {
        this.falseAll();
        this.womenNav = true;

      } else if (who === 'children') {
        this.falseAll();
        this.childrenNav = true;

      } else if (who === 'boys') {
        this.falseAll();
        this.boysNav = true;

      } else if (who === 'girls') {
        this.falseAll();
        this.girlsNav = true;

      } else if (who === 'shoes') {
        this.falseAll();
        this.shoesNav = true;

      } else if (who === 'accessories') {
        this.falseAll();
        this.accessoriesNav = true;
      }

      this.getAllOrSpecificClothes({
        pageSize: this.pageSize,
        sex: this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE' : this.getChildrenNav() ? 'CHILDREN' : this.getBoysNav() ? 'BOYS' : this.getGirlsNav() ? 'GIRLS' : '',
        itemType: this.getChildrenNav() ? 'CLOTH' : this.getWomenNav() ? 'CLOTH' : this.getMenNav() ? 'CLOTH' : this.getAccessoriesNav() ? 'ACCESSORIES' : this.getShoesNav() ? 'SHOES' : ''
      });

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
      type?: string[],
      itemType?: string    // ADDED JUST NOW
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
        type: data?.type != undefined ? data!.type : Array.of(),
        itemType: data?.itemType != undefined ? data!.itemType : ''
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

  //PAGEABLE FUNCTION
  getPreviousPage(paginationNumber: HTMLInputElement): void {
    if (!this.clothes?.first) {
      let data = this.sharedService
        .callDocumentQuerySelectorByString(['#clothes-colors',
          '#clothes-discounts',
          '#clothes-size',
          '#clothes-brand']);

      data['pageNo'] = this.currentPageNumber - 1;
      data['pageSize'] = this.pageSize;
      data['sex'] = this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE' : this.getChildrenNav() ? 'CHILDREN' : '';
      data['itemType'] = this.getChildrenNav() ? 'CLOTH' : this.getWomenNav() ? 'CLOTH' : this.getMenNav() ? 'CLOTH' : '';

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
      data['pageSize'] = this.pageSize;
      data['sex'] = this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE' : this.getChildrenNav() ? 'CHILDREN' : '';
      data['itemType'] = this.getChildrenNav() ? 'CLOTH' : this.getWomenNav() ? 'CLOTH' : this.getMenNav() ? 'CLOTH' : '';

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
      data['pageSize'] = this.pageSize;
      data['sex'] = this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE' : this.getChildrenNav() ? 'CHILDREN' : '';
      data['itemType'] = this.getChildrenNav() ? 'CLOTH' : this.getWomenNav() ? 'CLOTH' : this.getMenNav() ? 'CLOTH' : '';

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

  filterChangedDetect(type?: string) {
    let data = this.sharedService
      .callDocumentQuerySelectorByString(['#clothes-colors',
        '#clothes-discounts',
        '#clothes-size',
        '#clothes-brand',
        '#women-cloth-nav',
        '#men-cloth-nav',
        type != null ? type === 'BOYS' ? '#boys-cloth-nav' : type === 'GIRLS' ? '#girls-cloth-nav' : '' : '']);

    let isTypeOk: boolean = false;


    if (type != null) {

      if (type === 'BOYS') {
        this.sharedService.cleanCheckedBoxes('#girls-cloth-nav');

      } else if (type === 'GIRLS') {
        this.sharedService.cleanCheckedBoxes('#boys-cloth-nav');
      }
      isTypeOk = this.checkIfCheckedBoxes(type);
    }

    data['pageSize'] = this.pageSize;

    data['sex'] = this.getWomenNav() ? 'FEMALE' : this.getMenNav() ? 'MALE' : this.getGirlsNav() ? 'GIRLS' : this.getBoysNav() ? 'BOYS' : isTypeOk ? type : this.getChildrenNav() ? 'CHILDREN' : new DOMException("SEX is not selected!");
    this.getAllOrSpecificClothes(data);
  }


  //PAGEABLE FUNCTION

  checkIfCheckedBoxes(el: string): boolean {

    let isMatch: boolean = false;
    let temp: any = undefined;
    document.querySelectorAll(el === 'BOYS' ? '#boys-cloth-nav' : '#girls-cloth-nav')
      .forEach(value => {
        temp = value;
        if (temp.checked) {
          isMatch = true;
        }
      })

    return isMatch;
  }

  calculatePercentOfDiscount(oldPrice: number, newPrice: number): number {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  }

  falseAll(): void {
    this.womenNav = false;
    this.menNav = false;
    this.childrenNav = false;
    this.girlsNav = false;
    this.boysNav = false;
    this.shoesNav = false;
    this.accessoriesNav = false;
  }

  getWomenNav(): boolean {
    return this.womenNav;
  }

  getMenNav(): boolean {
    return this.menNav;
  }

  getChildrenNav(): boolean {
    return this.childrenNav;
  }

  getGirlsNav(): boolean {
    return this.girlsNav;
  }

  getBoysNav(): boolean {
    return this.boysNav;
  }

  getShoesNav(): boolean {
    return this.shoesNav;
  }

  getAccessoriesNav(): boolean {
    return this.accessoriesNav;
  }


  hideOrShowCardLikes(event: any) {
    let likesIcon = document.querySelector(`.clothes-card-text`);
    if (likesIcon?.classList.contains("hidden")) {
      likesIcon?.classList.remove("hidden");
    }else {
      likesIcon?.classList.add("hidden");
    }
  }
}
