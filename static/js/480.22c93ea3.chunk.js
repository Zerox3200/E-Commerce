"use strict";(self.webpackChunkecommerce=self.webpackChunkecommerce||[]).push([[480],{3480:(e,s,t)=>{t.r(s),t.d(s,{default:()=>p});var a=t(9060),c=t(8372),r=t(8807),i=t(6952),n=t(2024),d=t(8088),l=t(7564),o=t(4320),u=t(12),h=t(2496);function p(){const{UpdateQuantatiy:e,DeletCart:s}=(0,a.useContext)(l.a),[t,p]=(0,a.useState)(!1),[m,x]=(0,a.useState)(!0),{data:j,isLoading:C,refetch:v,isError:f}=(0,r.useQuery)("Carts",(async()=>await c.c.get("https://ecommerce.routemisr.com/api/v1/cart",{headers:{token:i.Q.get("Token")}}).catch((()=>x(!1)))),{refetchOnReconnect:!0,refetchOnWindowFocus:!0,enabled:m}),w=null===j||void 0===j?void 0:j.data.numOfCartItems,b=null===j||void 0===j?void 0:j.data.data.totalCartPrice,g=null===j||void 0===j?void 0:j.data.data._id,k=async(s,t)=>{0!==t?(p(!0),await e(s,t),v().then((()=>{p(!1),o.cp.success("Product Added successfully")}))):o.cp.error("You can't make cart lower that 1")};return(0,a.useEffect)((()=>{x(!0)}),[]),(0,h.jsxs)("div",{className:"Cart container mt-3",children:[(0,h.jsx)("h1",{className:"h2",children:"Shop Cart"}),C||t?(0,h.jsx)(n.s$,{visible:!0,height:"80",width:"80",color:"#4fa94d",radius:"9",ariaLabel:"three-dots-loading",wrapperStyle:{},wrapperClass:"CartLoader"}):f?(0,h.jsx)("span",{children:"Cart Number is : 0"}):j?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("span",{children:["Number of carts is :",w]})," ",(0,h.jsx)("br",{}),(0,h.jsxs)("span",{children:["Total Price : ",b," EG"]}),null===j||void 0===j?void 0:j.data.data.products.map(((e,t)=>(0,h.jsxs)("div",{className:"CartDesc w-100 row justify-content-between align-items-center mb-5",children:[(0,h.jsxs)("div",{className:"CartDesc_pt1 col-md-8",children:[(0,h.jsx)("img",{src:e.product.imageCover,alt:""}),(0,h.jsxs)("div",{className:"CartDesc_pt1_Details d-flex flex-column row-gap-2 mx-3 pt-4",children:[(0,h.jsxs)("p",{children:[e.product.title.split(" ").splice(0,2).join(" ")," "]}),(0,h.jsxs)("p",{children:["Price : ",e.price," EG"]}),(0,h.jsxs)("p",{onClick:()=>(async e=>{p(!0),await s(e),v().then((()=>{p(!1)}))})(e.product.id),children:[(0,h.jsx)(d.Om$,{})," Remove"]})]})]}),(0,h.jsxs)("div",{className:"CartDesc_pt2 d-flex justify-content-center align-items-center col-md-4",children:[(0,h.jsx)("span",{onClick:()=>k(e.product.id,e.count+1),children:"+"}),(0,h.jsx)("p",{children:e.count}),(0,h.jsx)("span",{onClick:()=>k(e.product.id,e.count-1),children:"-"})]})]},t))),(0,h.jsx)("div",{className:"CheckOut",children:(0,h.jsx)(u.cH,{to:"/Shipping/".concat(g),className:"btn w-50",children:"Book Order"})})]}):(0,h.jsx)("span",{children:"Cart Number is : 0"})]})}}}]);
//# sourceMappingURL=480.22c93ea3.chunk.js.map