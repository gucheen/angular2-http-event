# angular2-http-event
simple events center for angular2 http module

## Usage

### 1. add decorator `httpEmitter` to http method

```ts
import { httpEmitter } from '/path/to/http-event.service';

class demoHttpService() {
  constructor(private http: Http) {}
  
  @httpEmitter
  query(args) {
    return this.http.get().map(response => response.json);
  }
}
```

now this method will emit 'START' and 'FINISH' events.

### 2. subscribe to http event

``` ts
import { HttpEventService } from '/path/to/http-event.service';

@Component({...})
class DemoComponent implements OnInit {
  constructor(private httpEvent: HttpEventService) {}
  
  ngOnInit() {
    this.httpEvent.httpEventCenter.subscribe((type: HttpEventType) => {
      // event handler here...
    });
  }
}
```
