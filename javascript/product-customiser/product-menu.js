import { data } from "./data/data"

class ProductMenu extends HTMLElement {
    constructor() {
        super();
        this.scene;
        this.productDropDown = document.createElement("div"); 
        this.products = data.products;
        this.currentProduct = {productData: null, extras: []};
    }

    Init(scene)
    {
        this.scene = scene;
        this.HideAllObjects();
        this.UpdateCurrentProduct(this.products[0]);
    }

    HideAllObjects()
    {
        const mainParentName = this.scene.children[0].children[0].name;

        this.scene.traverse( function( object ) {
            // add opacity to glass
            if (object?.userData?.name?.toLowerCase()?.includes("glass"))
            {
                object.material.transparent = true;
                object.material.opacity = 0.5; 
            }
            
            // Only select objects that are buildings
            if (object?.parent?.name == mainParentName && !object.name.toLowerCase().includes("light")) 
                {
                    object.visible = false;
                }
        } );
    }

    UpdateCurrentProduct(newProduct)
    {

        // Set previous selection back to invisible
        if (this.currentProduct.productData != null)
        {
            this.currentProduct.productData.base_objects.forEach((bo) => {
                const p = this.scene.getObjectByName(bo);
                p.visible = false;
            })
        }
        
        this.currentProduct.productData = newProduct;
        this.currentProduct.productData.base_objects.forEach((bo) => {
            const p = this.scene.getObjectByName(bo);
            p.visible = true;
        })

        this.ClearMenu();
        this.RenderCurrentProduct();

        // Each time the product changes, so do the extras.
        const extra = this.currentProduct.productData.extras[this.currentProduct.productData.default_extra]
        const option = extra.options[extra.default_option];
        this.UpdateExtra(extra, option);
    }

    ClearMenu()
    {
        this.innerHTML = '';
    }

    RenderCurrentProduct()
    {
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("dropdown");

        const label = document.createElement("label");
        label.textContent = "Select Product";
        containerDiv.append(label);

        const select = document.createElement("select");

        select.addEventListener('change', (e) => {
            const newProduct = this.products.filter((p) => p.title == e.target.value)[0]
            this.UpdateCurrentProduct(newProduct);
        });
        
        this.products.forEach((product) => {
            const newOption = document.createElement("option");

            newOption.value = product.title;
            newOption.textContent = product.title;
            select.append(newOption);
        })

        // Set user selected product in the dropdown.
        select.value = this.currentProduct.productData.title;

        containerDiv.append(select);
        this.append(containerDiv);
    }

    UpdateExtra(newExtra, newOption)
    {
        const prevExtra = this.currentProduct.extras.filter((data) => data.extra.title == newExtra.title);
        // if previously previously an extra was selected, clear it before setting the new one.
        if (prevExtra.length > 0)
        {
            prevExtra[0].option.objects.forEach((obj) => {
                const p = this.scene.getObjectByName(obj);
                p.visible = false;
            })
            this.currentProduct.extras = this.currentProduct.extras.filter(
                (data) => data.extra.title != newExtra.title);
        }

        const newExtraObj = { extra: newExtra, option: newOption }
        this.currentProduct.extras.push(newExtraObj);

        newExtraObj.option.objects.forEach((bo) => {
            const p = this.scene.getObjectByName(bo);
            p.visible = true;
        })

        this.RenderExtras();
    }

    RenderExtras()
    {
        this.querySelector(".extras")?.remove();

        this.currentProduct.productData.extras.forEach((extra) => {

            const containerDiv = document.createElement("div");
            containerDiv.classList.add("dropdown", "extras");
    
            const label = document.createElement("label");
            label.textContent = extra.title;
            containerDiv.append(label);
    
            const select = document.createElement("select");
    
            select.addEventListener('change', (e) => {
                const newExtra = this.currentProduct.productData.extras.filter(
                    (prodExtra) => prodExtra.title == extra.title)[0];
                
                const newOption = newExtra.options.filter(opt => opt.title == e.target.value)[0];
                this.UpdateExtra(newExtra, newOption);
            });
            
            extra.options.forEach((option) => {
                const newOption = document.createElement("option");
    
                newOption.value = option.title;
                newOption.textContent = option.title;
                select.append(newOption);
            })


            // Select user selected value from dropdown
            const selectedExtra = this.currentProduct.extras.filter((data) =>
             data.extra.title == extra.title);

            if (selectedExtra.length > 0) select.value = selectedExtra[0].option.title;
            // select.value = selectedExtra[0].option

            containerDiv.append(select);
            this.append(containerDiv);
        })
    }

}

customElements.define("product-menu", ProductMenu);

