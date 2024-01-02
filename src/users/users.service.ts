import { ForbiddenException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";
import { catchError, firstValueFrom, map } from "rxjs";

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService
  ) {
  }

  async getUsers(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get("https://jsonplaceholder.typicode.com/users")
        .pipe(
          catchError((error: AxiosError) => {
            throw "An error happened!";
          })
        )
    );

    return data;
  }

  getUserPosts(userId: number): any {
    return this.httpService
      .get("https://jsonplaceholder.typicode.com/users/" + userId + "/posts")
      .pipe(
        map(response => response?.data)
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException("API not available");
        })
      );
  }
}