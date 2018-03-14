var admin = require('firebase-admin');
var serviceAccount = require('./Config/ks-pact-website-firebase-adminsdk-ox7l7-98df29499b.json');
/*admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ks-pact-website.firebaseio.com'
});*/

admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "ks-pact-website",
        "private_key_id": "69960fb45224c70c878d6efc793289a3672a8c96",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSsnbROzEMt+40\ndRN0cXBatO+XSp8ttmcBnUWPWtd6XbolhL2rjaWhvsC+gwEsGYIb6JOvbvTlD1AR\n9rUB5qNk7E/rmrzZRgrit17pGimFYILbEYNmMLQOiJIN966iT5+WFLt6RsYRQp+g\nXHZ2Tb+iJ7BLfpWA8e58QOKGA9Qi1ugODX+IpzwBlt6hlUsqEmo5cUexsowpwXBk\nUZWdT1ZAsqX0INDr67vck/NVcysyh/Ez17qm92PRJq0ivwf/4DNfV+uBjXVeSul8\nx2XUtJXzWHZp73puQzNYuZDk405/2dcgQL3jpes54Hpa7Zs+ZVGg09ctqS5SAmS8\nYkwd6sbzAgMBAAECggEAHMjM0At/c/ayJZspAUDOJ1Y4tTk4mIzRcw2tXHGopnWk\n4fifK49lEBJ4pTj4hrHQGJ1O2n9qGDEIsKuSUaQqBmD9D3mgUH6agMapwhFqQr0g\no2pibSo82bocBKnQbdQ66ndX9X3dvqs/a4ULmgtHzDtn1lMrfDuREos6vIb2tZuE\nLrwSPAy4cawNo/ajI1lV8jKvjFtWBfbgJxa5Wwcjv7QqGE2cPyTAQWauGRjvYeVV\nZrnnlHxdnTKFHqIL3UyDSyuVrY6TO3CcJRDcsWiUUUN1Z6nUq/uASMLYMr3M+YpI\nF4MSmTGIQwuv9fYyHgJTrSXWY6jdtr2tsOIyCFTioQKBgQD8L0gKQ3Na591xBXj0\nGNBsiKE2VsJcGexPkO7kIS3BlVgknq1rcrbESLdtXnA1TdZh1GYzhqq0TjsRF4bi\nwWqEhsKora48/7ii7B4rxfyF5lwxHRYD4JXcSZ4k/jn0me38oDUVMjFXwRxaURqr\n7jW6Fye5p3kbudXR7SfCnvqaTQKBgQDV4oALoFkS5dLqFTixDv60M6KJUchH0FS+\nX16QMOYuVy3ZYs1tuYfw9XM9f49RYqItn0hAElkNyNXQFnOVw/Uwg3JuELXB3JzP\nRDuIc3F8FBU0F+rqBB9Irc1uaPLwFfpyQdBHPdxiFcx26b0Ms17ub748viLrOVcH\n49tV16UGPwKBgQDkxgvHa8sxE5jamAlS/1PMseH1xp0JKmcrAyMEh2jX7aCJj/1o\ntSdCR2lHaV3HrXYnR6TzZ15itXl2Fu7BtI7p7MqYdP7UzXN1MVhpg3GDEyhdUbKQ\nD+RDc/FoQ8zVrfKss7WUJfWHU2NiN6NHh5Dr4WejT19ZnKtxhoAEWW6kHQKBgCnQ\n77HWNrQAJN1JKt1LDjcTBUsNpzeLHpZdtPJB7S7QMpGWxI0YQeC1TEOQxedmfkin\nJIwKSkjspAjb6ts0BaLngB7Ou4pcZHgNYgpKb7yPfJnDt1TrW2ZtPIXClQSld2KR\nRXQ4PvcaRfBVwHVUOFIrnKjpj5AnlMFhJgfBcm0nAoGBAIspv+YhtELvDow5hvGs\nOM992WSsnszDHy0Am3Z9ukv8fXROz6jLkQaR0bP9pRU7Gp+3b4CX9b4yVYBLdgHv\nJUqU3Thv6pZFgY14z4NLNWdWd7mRIQ+iQcR6CekA9ifBxo/dnP83V9RBtSxBDRtm\nOW1uFIqDeyyUK9nAiBb4OYYt\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-ox7l7@ks-pact-website.iam.gserviceaccount.com",
        "client_id": "112806238387872182898",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ox7l7%40ks-pact-website.iam.gserviceaccount.com"
    }),
    databaseURL: 'https://ks-pact-website.firebaseio.com'
});

export default admin;