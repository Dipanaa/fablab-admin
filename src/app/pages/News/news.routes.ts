import { Routes } from "@angular/router";
import { SingleNewComponent } from "./components/single-new/single-new.component";
import { NewsComponent } from "./News.component";
import { CreatorNewComponent } from "./components/creator-new/creator-new.component";

export  const routes: Routes = [
  {
    path:"",
    component: NewsComponent
  },
  {
    path: "",
    children:[
      {
        path:"administrationnew/:id",
        component: SingleNewComponent
      },
      {
        path:"creationnew",
        component: CreatorNewComponent
      }
    ]
  },
  {
    path:"**",
    redirectTo:""
  }
]

export default routes;
