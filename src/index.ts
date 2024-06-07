import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/inversify.config";
import * as morgan from "morgan";
import * as express from "express";

let expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

const server = new InversifyExpressServer(
  container,
  null,
  {
    rootPath: "/api/",
  },
  expressApp
);

server.setConfig((app) => {
  var logger = morgan("combined");
  app.use(logger);
});

server.setConfig((app) => {
  initializeApp({
    credential: cert({
      projectId: "interview-61417",
      clientEmail:
        "firebase-adminsdk-l8y19@interview-61417.iam.gserviceaccount.com",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAuNpfh7rzZse4\n8Wu/x2+sjLB3rsoxR+f/ElcO73RqLUjKgKaImDWnfgMwdiPRYf8m+M+PWRp0++JG\n0x9q4A6Ef6Q8lPjraRfEnBbLTLHm6CSmPZvkwmnZ91B6+3ChyAe084Qg0w/566b+\nb8hQMtTJR1Zf/I0P/RJORdjgkKyaQkT5oI9IXfmYid/lAlW5WErWKffhU1AaReIy\nGanFz7lkpSGd1v7zY6mkNY8pvr7QD+Rl/F5m0OPbL8lLSIIYXBvXhLqnfslSgWRQ\nRbVht0OW9HgzP0uy3le2j5tVNglti/m4fgGCE1Xb8YwaObDm3E/fRQPtTwWqY5Lw\ngFibJGjtAgMBAAECggEAASQhu8a96ex9Jwlbzuqe5bcMqKttj9d5NlzvmrKJDlHk\nNoD4nwXhCTrpSOxXfddmUTRCEJed+W6Tt7NO4kKfQ2Jci227gEHJ4WgX3crb9wjG\nhlWxKnOKsXfDsxB/97t9UKMlKU6YaHSZQZffvX3UAUcaBnCyjcwupvSNekEmYdJU\nF/V6lG/6oywUstrSv2yuFuLRUmHkSzHH0XLy/JfiT1fj6Oe5+iVFu6jD2j7Bk7aF\n8VPsp8P5uKglByvU6okI3PFHDo+nIkFLkYdT+7sHNBakeJJ03BHij/lSwsn4hZRa\nonYWFEgr2Eqr2Afa02KLqXXPPIk6+0V2C6YWVtC4gQKBgQD61q67SYq8aucbaOXx\nU9Lj3r457mUXZfljuDBqo23NAJVnYTNipM9AdAibHbs77w660DXpjA0NuCNcARsx\nF0or5+jnWcqPHXUhmOmWapmyWL6JVdVarPUMhw1eyMMQ5pi+cDuilvESbDtFPe0P\n4m7e5+Ey3ztQbDtyiZSrj/NbLQKBgQDEsAkva0Urx5rc76df3yxeyWBj12AflC5c\nBTl6qZih4Mu4r5fsb1OoPA0rhzuFD8bu0s/QNSF8Xf8vLfnNXzg679iEpi9tBzV/\nj7x3QMY8wuAPRL3Esia94hHJP0IO2bbf2jypztuqTPUKxJozpGqNOD4VglDde7rY\n5hTqRtrcwQKBgQCBlOYvWo6RR6icQFSJlwQbM7aRttYCgGuVWFGqxUKz5NlJzqz9\nCKcIZOkNOQ7Ap360g1tWi0MzEy0xGmExuxZWGDf5TCmYRV99O8FwMyGzQKUtzWmq\nri7pidseXBhpYrcFqnUkSVXAbqkv3A3bZt5fyOpNnYTGxyLuyKRE/Nh7AQKBgQCj\nlCg/eL5xd7NzNhmEoY48UszInHIEMXAQ9gNk4bHgR54Gvnril4AC9daaMgEtW/69\n1zQgXF+6GE7IBTuxMxUH5zuyrqfYzFsQ+RDsOUHlfMltyWTuNqAD4gWa0vJ0eVsf\nd1hmfXSxgQl26CW6923qfzEbIGNyoJm4FDqm0UDqwQKBgBYMO39uDjCw67tb7GOq\nKxxoNA5Z2mPbwKX2cSWKWGM/CUuGi/srlWJnR4E8hNmbGF5GNpCPSCt3lzBZ/wgy\nnohx7hAw0U7U684T/fpG6FFlt2LfGMLw1QIHU5vrHOfi2ZJa774xbeWw1epnFT/E\noPDMWoYgbxkcTnL6CY9PGeXj\n-----END PRIVATE KEY-----\n",
    }),
  });
});

server.setErrorConfig((app) => {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
});

let app = server.build();
app.listen(process.env.PORT || 9200);
