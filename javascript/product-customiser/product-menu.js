import { data } from "./data/data"

class ProductMenu extends HTMLElement {
    constructor() {
        super();
        this.scene;
        this.productDropDown;
    }

    Init(scene)
    {
        this.scene = scene;
        this.PrepareObjects();
        this.RenderMenu();
    }

    PrepareObjects()
    {
        const mainParent = this.scene.children[0].children[0].name;

        this.scene.traverse( function( object ) {
            // add opacity to glass
            if (object?.userData?.name?.toLowerCase()?.includes("glass"))
            {
                object.material.transparent = true;
                object.material.opacity = 0.5; 
            }

            // hide all objects
            if (object?.parent != mainParent.name)
            {
                // object is part of group, hide the parent
                object.parent.visible = false;
            } else {
                object.visible = false;
            }
        } );
    }

    
    RenderMenu()
    {
        const products = data.products;
        const defaultProduct = products[0];
    }
}

customElements.define("product-menu", ProductMenu);

