function generateLink(partnerid, secret, successReturnUrl) {
    const token =  crypto.createHash('sha256').update(
      successReturnUrl + secret,
    ).digest('hex');
    const url =
      'https://partner.shopeemobile.com/api/v1/shop/auth_partner' +
      `?id=${partnerid}&token=${token}&redirect=${successReturnUrl}`;
    return url