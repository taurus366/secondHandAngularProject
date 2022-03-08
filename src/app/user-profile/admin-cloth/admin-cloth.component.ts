import {Component, OnInit, Renderer2} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../authentication/user.service";
import {SharedService} from "../../shared/shared.service";

let FORM_ERROR_MSG: string = "";
let FORM_SUCCESSFUL_ADDED_NEW_ITEM:string = "";

@Component({
  selector: 'app-admin-cloth',
  templateUrl: './admin-cloth.component.html',
  styleUrls: ['./admin-cloth.component.css']
})
export class AdminClothComponent implements OnInit {

  constructor(private userService:UserService,private sharedService:SharedService, private renderer2:Renderer2) { }

  ngOnInit(): void {
    FORM_ERROR_MSG = this.sharedService.formMessages.FORM_ERROR_MSG;
    FORM_SUCCESSFUL_ADDED_NEW_ITEM = this.sharedService.formMessages.FORM_SUCCESSFUL_ADDED_NEW_ITEM;
  }

  preventDefault(event: MouseEvent):void {
    this.sharedService.preventDefault(event);
  }

  formData : FormData = new FormData();

  isCoverPictureUploaded : boolean = false;
  isFrontPictureUploaded : boolean = false;
  isThirdPictureUploaded : boolean = false;
  isFourthPictureUploaded : boolean = false;
  isSexIncorrect : boolean = false;
  isNewPriceIncorrect : boolean = false;
  isBrandIncorrect : boolean = false;
  isColorIncorrect : boolean = false;
  isCompositionIncorrect : boolean = false;
  isDescriptionIncorrect : boolean = false;
  isSeasonIncorrect :boolean = false;
  isSizeIncorrect : boolean = false;
  isStartPriceIncorrect : boolean = false;
  isTypeIncorrect :boolean = false;

  handleFileInput(event:any) {
    let selectedFile : File = <File>event.target.files[0];
    console.log(event.target.id)

    switch (event.target.id) {
      case 'coverDissabledImg':
        console.log("works")
       if ( this.formData.get('coverPicture')) {
         this.formData.set('coverPicture',selectedFile);
       }else {
         this.formData.append('coverPicture',selectedFile);
       }
        break;
      case 'frontDissabledImg':
      if (this.formData.get("frontPicture")) {
        this.formData.set('frontPicture',selectedFile);
      }else {
        this.formData.append('frontPicture',selectedFile);
      }
        break;
      case 'thirdDissabledImg':
        if (this.formData.get("thirdPicture")) {
          this.formData.set('thirdPicture',selectedFile);
        }else {
          this.formData.append('thirdPicture',selectedFile);
        }
        break;
      case 'fourthDissabledImg':
        if (this.formData.get("fourthPicture")){
          this.formData.set('fourthPicture',selectedFile);
        }else {
          this.formData.append('fourthPicture',selectedFile);
        }
        break;
    }

    // this.formData.append('picture', this.selectedFile, this.selectedFile.name);

    // this.formData.
    // this.formData.append('picture', this.selectedFile, this.selectedFile.name);

  }

  createNewCloth(form: NgForm) {

    if (form.invalid) {

      let formControl = form.controls;

      switch (formControl.coverPicture.status) {
        case "INVALID":
          this.isCoverPictureUploaded = true;
          break;
        case "VALID":
          this.isCoverPictureUploaded = false;
          break;
      }

      switch (formControl.frontPicture.status) {
        case "INVALID":
          this.isFrontPictureUploaded = true;
          break;
        case "VALID":
          this.isFrontPictureUploaded = false;
          break;
      }

      switch (formControl.thirdPicture.status) {
        case "INVALID":
          this.isThirdPictureUploaded = true;
          break;
        case "VALID":
          this.isThirdPictureUploaded = false;
          break;
      }

      switch (formControl.fourthPicture.status) {
        case "INVALID":
          this.isFourthPictureUploaded = true;
          break;
        case "VALID":
          this.isFourthPictureUploaded = false;
          break;
      }

      switch (formControl.sex.status) {
        case "INVALID":
          this.isSexIncorrect = true;
          break;
        case "VALID":
          this.isSexIncorrect = false;
          break;
      }

      switch (formControl.newPrice.status) {
        case "INVALID":
          this.isNewPriceIncorrect = true;
          break;
        case "VALID":
          this.isNewPriceIncorrect = false;
          break;
      }

      switch (formControl.brand.status) {
        case "INVALID":
          this.isBrandIncorrect = true;
          break;
        case "VALID":
          this.isBrandIncorrect = false;
          break;
      }

      switch (formControl.color.status) {
        case "INVALID":
          this.isColorIncorrect = true;
          break;
        case "VALID":
          this.isColorIncorrect = false;
          break;
      }

      switch (formControl.composition.status) {
        case "INVALID":
          this.isCompositionIncorrect = true;
          break;
        case "VALID":
          this.isCompositionIncorrect = false;
          break;
      }

      switch (formControl.description.status) {
        case "INVALID":
          this.isDescriptionIncorrect = true;
          break;
        case "VALID":
          this.isDescriptionIncorrect = false;
          break;
      }

      switch (formControl.season.status) {
        case "INVALID":
          this.isSeasonIncorrect = true;
          break;
        case "VALID":
          this.isSeasonIncorrect = false;
          break;
      }

      switch (formControl.size.status) {
        case "INVALID":
          this.isSizeIncorrect = true;
          break;
        case "VALID":
          this.isSizeIncorrect = false;
          break;
      }

      switch (formControl.startPrice.status) {
        case "INVALID":
          this.isStartPriceIncorrect = true;
          break;
        case "VALID":
          this.isStartPriceIncorrect = false;
          break;
      }

      switch (formControl.type.status) {
        case "INVALID":
          this.isTypeIncorrect = true;
          break;
        case "VALID":
          this.isTypeIncorrect = false;
          break;
      }

      this.sharedService
        .showAlertMsg
        .error(FORM_ERROR_MSG);

      return;
    }

  let {sex,newPrice,brand,color,composition,description,season,size,startPrice,type} = form.value;

    this.formData.append("sex", sex);
    this.formData.append("newPrice",newPrice);
    this.formData.append("brand",brand);
    this.formData.append("color",color);
    this.formData.append("composition",composition);
    this.formData.append("description",description);
    this.formData.append("season",season);
    this.formData.append("size",size);
    this.formData.append("startPrice",startPrice);
    this.formData.append("type",type);

    this.formData.get("picture")
    this.userService.addNewCloth(this.formData).subscribe({
      next:value => {
        // console.log(value)
      },
      error:err => {
        let err_msg :string = "";

        Array.from(err.error)
          .forEach(value => {
            // @ts-ignore
            let defaultMsg = value.defaultMessage.toString();

            // @ts-ignore
            console.log(value.field)
            err_msg += `${ '['+defaultMsg+']' }`;
            // @ts-ignore
            switch (value.field) {
              case 'type':
                this.isTypeIncorrect = true;
                break;
              case 'size':
                this.isSizeIncorrect = true;
                break;
              case 'startPrice':
                this.isStartPriceIncorrect = true;
                break;
              case 'brand':
                this.isBrandIncorrect = true;
                break;
              case 'composition':
                this.isCompositionIncorrect = true;
                break;
              case 'sex':
                this.isSexIncorrect = true;
                break;
              case 'season':
                this.isSeasonIncorrect = true;
                break;
              case 'color':
                this.isColorIncorrect = true;
                break;
              case 'newPrice':
                this.isNewPriceIncorrect = true;
                break;
              case 'coverPicture':
                this.isCoverPictureUploaded = true;
                break;
              case 'frontPicture':
                this.isFrontPictureUploaded = true;
                break;
              case 'thirdPicture':
                this.isThirdPictureUploaded = true;
                break;
              case 'fourthPicture':
                this.isFourthPictureUploaded = true;
                break;
            }
          })

        console.log(err)
        this.sharedService
          .showAlertMsg
          .error(err_msg);
      },
      complete:() => {
        this.sharedService
          .showAlertMsg
          .success(FORM_SUCCESSFUL_ADDED_NEW_ITEM);
      }
    })
  }

  pictureEv(event: any) {
    let elId = event.target.id.toLowerCase();
    let selectRootElement = undefined;

    if (elId === 'coverimg'){
      selectRootElement = this.renderer2.selectRootElement('#coverDissabledImg');
    } else if (elId === 'frontimg') {
      selectRootElement = this.renderer2.selectRootElement('#frontDissabledImg');
    } else if (elId === 'thirdimg') {
      selectRootElement = this.renderer2.selectRootElement('#thirdDissabledImg');
    } else if (elId === 'fourthimg') {
      selectRootElement = this.renderer2.selectRootElement('#fourthDissabledImg');
    }

    selectRootElement?.click();
  }

}
