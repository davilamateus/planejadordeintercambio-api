function confirmEmail(name, token) {
    return (`

<div style="display: flex; align-items: center; justify-content: center; background-color: #fff; font-family: Arial, Helvetica, sans-serif;  place-items: center;   align-items: center;
    width: max-content;
    margin: 0 auto;">

<img class="aligncenter" src="https://planejadordeintercambio.com.br/emails/img/personEmail.png" />
<div style="border-radius: 8px; border: 1px solid #00000012; width: 360px; height: max-content; justify-content: center; align-items: center; text-align: center; margin: 0 auto; padding: 32px;">
<h2 style="text-align: center;"><strong>Olá ${name}!</strong></h2>
<p style="text-align: center;"><span style="color: #999999;">Estamos muito empolgados com o seu cadastro.</span></p>
<p style="text-align: center;"><span style="color: #999999;">Agora só falta você ativar a sua conta, confirmando o seu email pelo link abaixo.</span></p>
<p style="text-align: center;"><span style="color: #999999;"><a href="https://planejadordeintercambio.com.br/confirm-email/${token}"><button style="background: #6AD9A8; color: #000; font-size: 16px; font-weight: 600; border: none; padding: 8px; width: 270px; border-radius: 4px;">Confirmar Email</button></a>
</span></p>
&nbsp;

&nbsp;
<p style="text-align: center;"><span style="color: #808080;">A caso não consiga clicar no botão, copie e cole o link na barra de endereço do seu navegador.</span></p>
<p style="text-align: center;"><a href="https://planejadordeintercambio.com.br/confirm-email/${token}" target="_blank" rel="noopener">https://planejadordeintercambio.com.br/confirm-email/${token}</a></p>

</div>
</div>
        
        `
    )
}

module.exports = confirmEmail