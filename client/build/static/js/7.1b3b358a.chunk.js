(this.webpackJsonpAudioBoock=this.webpackJsonpAudioBoock||[]).push([[7],{318:function(e,t,a){"use strict";var s=a(411),r=a(304),n=a(3);t.a=function(e){var t=e.name,a=e.placeholder,u=e.type,c=e.handleChange,l=e.handleBlur,i=e.errors,o=e.values;return Object(n.jsx)(s.a.Item,{validateStatus:i[t].status?"error":void 0,help:i[t].status?i[t].text:void 0,hasFeedback:!0,children:Object(n.jsx)(r.a,{id:t,name:t,size:"large",placeholder:a,value:o[t],onChange:c,onBlur:l,type:u})})}},321:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var s=function(e){return/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(e)}},401:function(e,t,a){},408:function(e,t,a){"use strict";a.r(t);var s=a(106),r=a(105),n=a(52),u=(a(401),a(0)),c=a.n(u),l=a(411),i=a(60),o=a(39),d=a(318),j=a(307),b=a(19),h=a(22),p=a(321),O=a(34),m=a(30),f=a(3);t.default=function(){var e=Object(j.a)().t,t=Object(b.c)(),a=Object(b.d)(h.d),u=c.a.useState({email:"",fullname:"",password:"",password_2:""}),x=Object(n.a)(u,2),v=x[0],w=x[1],g=c.a.useState({email:{status:!1,text:""},fullname:{status:!1,text:""},password:{status:!1,text:""},password_2:{status:!1,text:""}}),_=Object(n.a)(g,2),y=_[0],k=_[1],C=c.a.useCallback((function(e){var t=e.target,a=t.name,n=t.value;!0===y[a].status&&k((function(e){return Object(r.a)(Object(r.a)({},e),{},Object(s.a)({},a,{status:!1,text:""}))})),w((function(e){return Object(r.a)(Object(r.a)({},e),{},Object(s.a)({},a,n))}))}),[y]),B=c.a.useCallback((function(t){var a=t.target,n=a.name,u=a.value;if("email"===n&&u){var c=!Object(p.a)(u);k((function(t){return Object(r.a)(Object(r.a)({},t),{},Object(s.a)({},n,{status:c,text:c?e("errors.emailNotValid"):""}))}))}else if("password_2"===n&&u){var l=v.password!==u;k((function(t){return Object(r.a)(Object(r.a)({},t),{},Object(s.a)({},n,{status:l,text:l?e("errors.passwordsEquality"):""}))}))}else if("password"===n&&v.password_2&&u){var i=v.password!==v.password_2;k((function(t){return Object(r.a)(Object(r.a)({},t),{},{password_2:{status:i,text:i?e("errors.passwordsEquality"):""}})}))}else k((function(t){return Object(r.a)(Object(r.a)({},t),{},Object(s.a)({},n,{status:!u,text:u?"":e("errors.required")}))}))}),[e,v]),N=c.a.useMemo((function(){return Object.values(y).some((function(e){return!0===e.status}))||a}),[y,a]),S=c.a.useCallback((function(a){a.preventDefault(),Object.entries(v).reduce((function(t,a){var u=Object(n.a)(a,2),c=u[0];return u[1]?t:(k((function(t){return Object(r.a)(Object(r.a)({},t),{},Object(s.a)({},c,{status:!0,text:e("errors.required")}))})),!0)}),!1)||t(O.a.fetchRegistration(v))}),[e,v,t]);return Object(f.jsx)("section",{className:"auth",children:Object(f.jsxs)("div",{className:"auth__content",children:[Object(f.jsxs)("div",{className:"auth__top",children:[Object(f.jsx)("h2",{children:e("auth.headerRegistration.title")}),Object(f.jsx)("p",{children:e("auth.headerRegistration.subtitle")})]}),Object(f.jsx)("div",{children:Object(f.jsxs)("form",{onSubmit:S,className:"login-form",children:[Object(f.jsx)(d.a,{name:"email",type:"text",placeholder:e("auth.input.email"),handleChange:C,handleBlur:B,errors:y,values:v}),Object(f.jsx)(d.a,{name:"fullname",type:"text",placeholder:e("auth.input.fullName"),handleChange:C,handleBlur:B,errors:y,values:v}),Object(f.jsx)(d.a,{name:"password",placeholder:e("auth.input.password"),type:"password",handleChange:C,handleBlur:B,errors:y,values:v}),Object(f.jsx)(d.a,{name:"password_2",placeholder:e("auth.input.password"),type:"password",handleChange:C,handleBlur:B,errors:y,values:v}),Object(f.jsx)(l.a.Item,{children:Object(f.jsx)(i.a,{disabled:N,block:!0,type:"primary",htmlType:"submit",onSubmit:S,size:"large",children:e("auth.button.registration")})}),Object(f.jsx)(o.b,{className:"auth__register-link",to:m.a.getSignin(),children:e("auth.button.signIn")})]})})]})})}}}]);
//# sourceMappingURL=7.1b3b358a.chunk.js.map