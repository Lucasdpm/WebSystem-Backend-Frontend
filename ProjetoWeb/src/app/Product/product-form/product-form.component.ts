import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { UserService } from '../../user.service';
import { Access } from '../../access';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  productId: number = Number.parseInt(this.router.url.slice(9))
  formGroup: FormGroup = <FormGroup>{}
  userHasPermitionResult = false
  submitted = false
  error: any;

  constructor(private productService: ProductService, private formBuilder:FormBuilder, private router: Router, private userService: UserService) {
    this.userHasPermition().subscribe(result => {
			this.userHasPermitionResult = result
		})
    this.initFormProduct()
  }
  
  initFormProduct() {
    if(this.productId) {
      this.productService.getProductById(this.productId).subscribe(product => {
        this.formGroup = this.formBuilder.group({
          id: [product.id],
          name: [product.name, [Validators.required, Validators.minLength(5)]],
          price: [product.price],
          weight: [product.weight, [this.weightValidator]],
          description: [product.description],
          storage: [product.storage, [this.storageValidator]]
        })
      })
    } else {
      this.formGroup = this.formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(5)]],
        price: 0,
        weight: [0, [this.weightValidator]],
        description: '',
        storage: [0, [this.storageValidator]]
      })
    }
    
  }
  
  weightValidator(control: AbstractControl) {
    const weightRegex = /^\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/
    const weight = control.value

    const valid = weightRegex.test(weight) || !weight.length
    return valid ? null : {weightValidator: true}
  }

  storageValidator(control: AbstractControl) {
    const storageRegex = /^\d+$/
    const storage = control.value

    const valid = storageRegex.test(storage) || !storage.length
    return valid ? null : {storageValidator: true}
  }

  submitChanges() {
    this.submitted = true

    if (this.formGroup.invalid) {
      return
    }
    this.productService.updateProduct(this.productId, this.formGroup.value).subscribe(() => {
      this.router.navigate(['/productManagement'])
    })
  }

  registerProduct() {
    this.submitted = true

    if (this.formGroup.invalid) {
      return
    }

    this.productService.addProduct(this.formGroup.value).subscribe(() => {
      this.router.navigate(['/productManagement'])
    })
  }

  userHasPermition(): Observable<boolean> {
		let result = new Subject<boolean>()

		this.userService.getCurrentUser().subscribe(user => {
			result.next(user.access === Access.admin)
		}, (err) => {
			this.error = `Erro ao carregar usuario. StackTrace: ${err}`
			result.next(false)
		})
		return result.asObservable()
	}

  delete() {
    this.productService.deleteProduct(this.productId).subscribe(() => {
      this.router.navigate(['/productManagement'])
    })
  }
}
