import { TestBed } from '@angular/core/testing';
import { CanActivateFn, GuardResult, Router } from '@angular/router';


import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
            TestBed.runInInjectionContext(() => Promise.resolve({} as GuardResult));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, AuthService]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to login page if user is not logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    spyOn(router, 'navigate');

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow access if user is logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(router, 'navigate');

    const canActivate = guard.canActivate();

    expect(canActivate).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
