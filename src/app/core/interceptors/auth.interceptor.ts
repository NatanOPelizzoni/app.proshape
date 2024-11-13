import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from "../../modules/auth/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const authService = inject(AuthService);
	const authToken = authService.getStringToken();
	const authReq = req.clone({
		setHeaders: {Authorization: `${authToken}`}
	});
	return next(authReq);
};
