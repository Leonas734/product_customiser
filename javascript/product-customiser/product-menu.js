import { data } from "./data/data"

class ProductMenu extends HTMLElement {
    constructor() {
        super();
        this.scene;
        this.productDropDown = document.createElement("div"); 
        this.products = data.products;
        this.currentProduct = null;
    }

    Init(scene)
    {
        this.scene = scene;
        this.HideAllObjects();
        this.UpdateCurrentProduct(this.products[0]);
        this.RenderProductDropDown();
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

    RenderProductDropDown()
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

        containerDiv.append(select);
        this.append(containerDiv);
    }

    UpdateCurrentProduct(newProduct)
    {

        if (this.currentProduct != null)
        {
            this.currentProduct.base_objects.forEach((bo) => {
                const p = this.scene.getObjectByName(bo);
                p.visible = false;
            })
        }
        
        this.currentProduct = newProduct;

        this.currentProduct.base_objects.forEach((bo) => {
            const p = this.scene.getObjectByName(bo);
            p.visible = true;
        })

        this.RenderExtras();
    }

    RenderExtras()
    {

    }
}

customElements.define("product-menu", ProductMenu);

