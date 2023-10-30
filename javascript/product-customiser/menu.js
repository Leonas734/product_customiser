let threeJSScene;
import { data } from "./data/data"


function InitMenu(scene)
{
    threeJSScene = scene;
    UpdateGlassOpacity()
}

function UpdateGlassOpacity()
{
    threeJSScene.traverse( function( object ) {
        if (object?.userData?.name?.toLowerCase()?.includes("glass"))
        {
            object.material.transparent = true;
            object.material.opacity = 0.5; 
        }

    } );
}

export { InitMenu }