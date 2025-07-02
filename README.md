# Angular Open Meteo

Aplicação Angular para consulta de clima em tempo real, utilizando a API Open-Meteo.

## Funcionalidades

- Busca de cidades para previsão do tempo.
- Exibe temperatura atual, máxima, mínima e velocidade do vento.
- Animação de loading durante a busca.
- Tratamento de erros para cidade não encontrada ou falha na API.
- Interface responsiva e moderna com Angular Material.

## Tecnologias Utilizadas

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [Open-Meteo API](https://open-meteo.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)

## Estrutura do Projeto

```
src/
  app/
    componentes/
      busca/         # Componente de busca de cidades
      clima/         # Componente de exibição do clima
    app.component.ts # Componente principal
    ...
```

## Como Executar

1. **Instale as dependências:**
   ```
   npm install
   ```

2. **Rode a aplicação:**
   ```
   ng serve
   ```
   Acesse em [http://localhost:4200](http://localhost:4200)

3. **Rodar os testes:**
   ```
   ng test
   ```

## Como Usar

- Na tela inicial, digite o nome da cidade e clique em "Buscar".
- Aguarde o carregamento. Os dados do clima serão exibidos.
- Caso a cidade não seja encontrada, uma mensagem de erro será mostrada.
- Use o botão "Voltar" para retornar à busca.

## Testes

- Testes unitários escritos com Jasmine e TestBed.
- Para rodar: `ng test`
- Os testes cobrem criação de componentes, navegação e tratamento de erros.

## Observações

- A aplicação utiliza a API gratuita do Open-Meteo, sujeita a limitações de uso.
- O design utiliza componentes do Angular Material para melhor experiência do usuário.

## Licença

Projeto educacional - Generation Brasil.
