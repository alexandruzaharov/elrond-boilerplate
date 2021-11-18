import { Component } from '@angular/core';
import { Address, ExtensionProvider, SignableMessage, UserVerifier } from '@elrondnetwork/erdjs/out';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dapp';

  async login() {
    let provider = ExtensionProvider.getInstance();
    await provider.init();
    let account = await provider.login();
    let message = new SignableMessage({
      message: Buffer.from('TestMe', 'utf8'),
      address: new Address(account)
    });

    let signed = await provider.signMessage(message);
    console.log('signed message:', signed);
    let verifier = UserVerifier.fromAddress(new Address(account));
    console.log('is signature valid: ', verifier.verify(signed));
  }
}
