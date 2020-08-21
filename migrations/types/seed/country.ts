import pg from '../../../src/proxies/db/pg';

class CountrySeeds {
  static async run() {
    const countries = [
      {
        name: 'Andorra',
        currency: 'EUR',
        language: 'ca',
        iso: 'AD',
      },
      {
        name: 'United Arab Emirates',
        currency: 'AED',
        language: 'ar',
        iso: 'AE',
      },
      {
        name: 'Afghanistan',
        currency: 'AFN',
        language: 'ps',
        iso: 'AF',
      },
      {
        name: 'Antigua and Barbuda',
        currency: 'XCD',
        language: 'en',
        iso: 'AG',
      },
      {
        name: 'Anguilla',
        currency: 'XCD',
        language: 'en',
        iso: 'AI',
      },
      {
        name: 'Albania',
        currency: 'ALL',
        language: 'sq',
        iso: 'AL',
      },
      {
        name: 'Armenia',
        currency: 'AMD',
        language: 'hy',
        iso: 'AM',
      },
      {
        name: 'Angola',
        currency: 'AOA',
        language: 'pt',
        iso: 'AO',
      },
      {
        name: 'Argentina',
        currency: 'ARS',
        language: 'es',
        iso: 'AR',
      },
      {
        name: 'American Samoa',
        currency: 'USD',
        language: 'en',
        iso: 'AS',
      },
      {
        name: 'Austria',
        currency: 'EUR',
        language: 'de',
        iso: 'AT',
      },
      {
        name: 'Australia',
        currency: 'AUD',
        language: 'en',
        iso: 'AU',
      },
      {
        name: 'Aruba',
        currency: 'AWG',
        language: 'nl',
        iso: 'AW',
      },
      {
        name: 'Åland',
        currency: 'EUR',
        language: 'sv',
        iso: 'AX',
      },
      {
        name: 'Azerbaijan',
        currency: 'AZN',
        language: 'az',
        iso: 'AZ',
      },
      {
        name: 'Bosnia and Herzegovina',
        currency: 'BAM',
        language: 'bs',
        iso: 'BA',
      },
      {
        name: 'Barbados',
        currency: 'BBD',
        language: 'en',
        iso: 'BB',
      },
      {
        name: 'Bangladesh',
        currency: 'BDT',
        language: 'bn',
        iso: 'BD',
      },
      {
        name: 'Belgium',
        currency: 'EUR',
        language: 'nl',
        iso: 'BE',
      },
      {
        name: 'Burkina Faso',
        currency: 'XOF',
        language: 'fr',
        iso: 'BF',
      },
      {
        name: 'Bulgaria',
        currency: 'BGN',
        language: 'bg',
        iso: 'BG',
      },
      {
        name: 'Bahrain',
        currency: 'BHD',
        language: 'ar',
        iso: 'BH',
      },
      {
        name: 'Burundi',
        currency: 'BIF',
        language: 'fr',
        iso: 'BI',
      },
      {
        name: 'Benin',
        currency: 'XOF',
        language: 'fr',
        iso: 'BJ',
      },
      {
        name: 'Saint Barthélemy',
        currency: 'EUR',
        language: 'fr',
        iso: 'BL',
      },
      {
        name: 'Bermuda',
        currency: 'BMD',
        language: 'en',
        iso: 'BM',
      },
      {
        name: 'Brunei',
        currency: 'BND',
        language: 'ms',
        iso: 'BN',
      },
      {
        name: 'Bolivia',
        currency: 'BOB',
        language: 'es',
        iso: 'BO',
      },
      {
        name: 'Bonaire',
        currency: 'USD',
        language: 'nl',
        iso: 'BQ',
      },
      {
        name: 'Brazil',
        currency: 'BRL',
        language: 'pt',
        iso: 'BR',
      },
      {
        name: 'Bahamas',
        currency: 'BSD',
        language: 'en',
        iso: 'BS',
      },
      {
        name: 'Bhutan',
        currency: 'BTN',
        language: 'dz',
        iso: 'BT',
      },
      {
        name: 'Bouvet Island',
        currency: 'NOK',
        language: 'no',
        iso: 'BV',
      },
      {
        name: 'Botswana',
        currency: 'BWP',
        language: 'en',
        iso: 'BW',
      },
      {
        name: 'Belarus',
        currency: 'BYN',
        language: 'be',
        iso: 'BY',
      },
      {
        name: 'Belize',
        currency: 'BZD',
        language: 'en',
        iso: 'BZ',
      },
      {
        name: 'Canada',
        currency: 'CAD',
        language: 'en',
        iso: 'CA',
      },
      {
        name: 'Cocos [Keeling] Islands',
        currency: 'AUD',
        language: 'en',
        iso: 'CC',
      },
      {
        name: 'Democratic Republic of the Congo',
        currency: 'CDF',
        language: 'fr',
        iso: 'CD',
      },
      {
        name: 'Central African Republic',
        currency: 'XAF',
        language: 'fr',
        iso: 'CF',
      },
      {
        name: 'Republic of the Congo',
        currency: 'XAF',
        language: 'fr',
        iso: 'CG',
      },
      {
        name: 'Switzerland',
        currency: 'CHE',
        language: 'de',
        iso: 'CH',
      },
      {
        name: 'Ivory Coast',
        currency: 'XOF',
        language: 'fr',
        iso: 'CI',
      },
      {
        name: 'Cook Islands',
        currency: 'NZD',
        language: 'en',
        iso: 'CK',
      },
      {
        name: 'Chile',
        currency: 'CLF',
        language: 'es',
        iso: 'CL',
      },
      {
        name: 'Cameroon',
        currency: 'XAF',
        language: 'en',
        iso: 'CM',
      },
      {
        name: 'China',
        currency: 'CNY',
        language: 'zh',
        iso: 'CN',
      },
      {
        name: 'Colombia',
        currency: 'COP',
        language: 'es',
        iso: 'CO',
      },
      {
        name: 'Costa Rica',
        currency: 'CRC',
        language: 'es',
        iso: 'CR',
      },
      {
        name: 'Cuba',
        currency: 'CUC',
        language: 'es',
        iso: 'CU',
      },
      {
        name: 'Cape Verde',
        currency: 'CVE',
        language: 'pt',
        iso: 'CV',
      },
      {
        name: 'Curacao',
        currency: 'ANG',
        language: 'nl',
        iso: 'CW',
      },
      {
        name: 'Christmas Island',
        currency: 'AUD',
        language: 'en',
        iso: 'CX',
      },
      {
        name: 'Cyprus',
        currency: 'EUR',
        language: 'el',
        iso: 'CY',
      },
      {
        name: 'Czech Republic',
        currency: 'CZK',
        language: 'cs',
        iso: 'CZ',
      },
      {
        name: 'Germany',
        currency: 'EUR',
        language: 'de',
        iso: 'DE',
      },
      {
        name: 'Djibouti',
        currency: 'DJF',
        language: 'fr',
        iso: 'DJ',
      },
      {
        name: 'Denmark',
        currency: 'DKK',
        language: 'da',
        iso: 'DK',
      },
      {
        name: 'Dominica',
        currency: 'XCD',
        language: 'en',
        iso: 'DM',
      },
      {
        name: 'Dominican Republic',
        currency: 'DOP',
        language: 'es',
        iso: 'DO',
      },
      {
        name: 'Algeria',
        currency: 'DZD',
        language: 'ar',
        iso: 'DZ',
      },
      {
        name: 'Ecuador',
        currency: 'USD',
        language: 'es',
        iso: 'EC',
      },
      {
        name: 'Estonia',
        currency: 'EUR',
        language: 'et',
        iso: 'EE',
      },
      {
        name: 'Egypt',
        currency: 'EGP',
        language: 'ar',
        iso: 'EG',
      },
      {
        name: 'Western Sahara',
        currency: 'MAD',
        language: 'es',
        iso: 'EH',
      },
      {
        name: 'Eritrea',
        currency: 'ERN',
        language: 'ti',
        iso: 'ER',
      },
      {
        name: 'Spain',
        currency: 'EUR',
        language: 'es',
        iso: 'ES',
      },
      {
        name: 'Ethiopia',
        currency: 'ETB',
        language: 'am',
        iso: 'ET',
      },
      {
        name: 'Finland',
        currency: 'EUR',
        language: 'fi',
        iso: 'FI',
      },
      {
        name: 'Fiji',
        currency: 'FJD',
        language: 'en',
        iso: 'FJ',
      },
      {
        name: 'Falkland Islands',
        currency: 'FKP',
        language: 'en',
        iso: 'FK',
      },
      {
        name: 'Micronesia',
        currency: 'USD',
        language: 'en',
        iso: 'FM',
      },
      {
        name: 'Faroe Islands',
        currency: 'DKK',
        language: 'fo',
        iso: 'FO',
      },
      {
        name: 'France',
        currency: 'EUR',
        language: 'fr',
        iso: 'FR',
      },
      {
        name: 'Gabon',
        currency: 'XAF',
        language: 'fr',
        iso: 'GA',
      },
      {
        name: 'United Kingdom',
        currency: 'GBP',
        language: 'en',
        iso: 'GB',
      },
      {
        name: 'Grenada',
        currency: 'XCD',
        language: 'en',
        iso: 'GD',
      },
      {
        name: 'Georgia',
        currency: 'GEL',
        language: 'ka',
        iso: 'GE',
      },
      {
        name: 'French Guiana',
        currency: 'EUR',
        language: 'fr',
        iso: 'GF',
      },
      {
        name: 'Guernsey',
        currency: 'GBP',
        language: 'en',
        iso: 'GG',
      },
      {
        name: 'Ghana',
        currency: 'GHS',
        language: 'en',
        iso: 'GH',
      },
      {
        name: 'Gibraltar',
        currency: 'GIP',
        language: 'en',
        iso: 'GI',
      },
      {
        name: 'Greenland',
        currency: 'DKK',
        language: 'kl',
        iso: 'GL',
      },
      {
        name: 'Gambia',
        currency: 'GMD',
        language: 'en',
        iso: 'GM',
      },
      {
        name: 'Guinea',
        currency: 'GNF',
        language: 'fr',
        iso: 'GN',
      },
      {
        name: 'Guadeloupe',
        currency: 'EUR',
        language: 'fr',
        iso: 'GP',
      },
      {
        name: 'Equatorial Guinea',
        currency: 'XAF',
        language: 'es',
        iso: 'GQ',
      },
      {
        name: 'Greece',
        currency: 'EUR',
        language: 'el',
        iso: 'GR',
      },
      {
        name: 'South Georgia and the South Sandwich Islands',
        currency: 'GBP',
        language: 'en',
        iso: 'GS',
      },
      {
        name: 'Guatemala',
        currency: 'GTQ',
        language: 'es',
        iso: 'GT',
      },
      {
        name: 'Guam',
        currency: 'USD',
        language: 'en',
        iso: 'GU',
      },
      {
        name: 'Guinea-Bissau',
        currency: 'XOF',
        language: 'pt',
        iso: 'GW',
      },
      {
        name: 'Guyana',
        currency: 'GYD',
        language: 'en',
        iso: 'GY',
      },
      {
        name: 'Hong Kong',
        currency: 'HKD',
        language: 'zh',
        iso: 'HK',
      },
      {
        name: 'Heard Island and McDonald Islands',
        currency: 'AUD',
        language: 'en',
        iso: 'HM',
      },
      {
        name: 'Honduras',
        currency: 'HNL',
        language: 'es',
        iso: 'HN',
      },
      {
        name: 'Croatia',
        currency: 'HRK',
        language: 'hr',
        iso: 'HR',
      },
      {
        name: 'Haiti',
        currency: 'HTG',
        language: 'fr',
        iso: 'HT',
      },
      {
        name: 'Hungary',
        currency: 'HUF',
        language: 'hu',
        iso: 'HU',
      },
      {
        name: 'Indonesia',
        currency: 'IDR',
        language: 'id',
        iso: 'ID',
      },
      {
        name: 'Ireland',
        currency: 'EUR',
        language: 'ga',
        iso: 'IE',
      },
      {
        name: 'Israel',
        currency: 'ILS',
        language: 'he',
        iso: 'IL',
      },
      {
        name: 'Isle of Man',
        currency: 'GBP',
        language: 'en',
        iso: 'IM',
      },
      {
        name: 'India',
        currency: 'INR',
        language: 'hi',
        iso: 'IN',
      },
      {
        name: 'British Indian Ocean Territory',
        currency: 'USD',
        language: 'en',
        iso: 'IO',
      },
      {
        name: 'Iraq',
        currency: 'IQD',
        language: 'ar',
        iso: 'IQ',
      },
      {
        name: 'Iran',
        currency: 'IRR',
        language: 'fa',
        iso: 'IR',
      },
      {
        name: 'Iceland',
        currency: 'ISK',
        language: 'is',
        iso: 'IS',
      },
      {
        name: 'Italy',
        currency: 'EUR',
        language: 'it',
        iso: 'IT',
      },
      {
        name: 'Jersey',
        currency: 'GBP',
        language: 'en',
        iso: 'JE',
      },
      {
        name: 'Jamaica',
        currency: 'JMD',
        language: 'en',
        iso: 'JM',
      },
      {
        name: 'Jordan',
        currency: 'JOD',
        language: 'ar',
        iso: 'JO',
      },
      {
        name: 'Japan',
        currency: 'JPY',
        language: 'ja',
        iso: 'JP',
      },
      {
        name: 'Kenya',
        currency: 'KES',
        language: 'en',
        iso: 'KE',
      },
      {
        name: 'Kyrgyzstan',
        currency: 'KGS',
        language: 'ky',
        iso: 'KG',
      },
      {
        name: 'Cambodia',
        currency: 'KHR',
        language: 'km',
        iso: 'KH',
      },
      {
        name: 'Kiribati',
        currency: 'AUD',
        language: 'en',
        iso: 'KI',
      },
      {
        name: 'Comoros',
        currency: 'KMF',
        language: 'ar',
        iso: 'KM',
      },
      {
        name: 'Saint Kitts and Nevis',
        currency: 'XCD',
        language: 'en',
        iso: 'KN',
      },
      {
        name: 'North Korea',
        currency: 'KPW',
        language: 'ko',
        iso: 'KP',
      },
      {
        name: 'South Korea',
        currency: 'KRW',
        language: 'ko',
        iso: 'KR',
      },
      {
        name: 'Kuwait',
        currency: 'KWD',
        language: 'ar',
        iso: 'KW',
      },
      {
        name: 'Cayman Islands',
        currency: 'KYD',
        language: 'en',
        iso: 'KY',
      },
      {
        name: 'Kazakhstan',
        currency: 'KZT',
        language: 'kk',
        iso: 'KZ',
      },
      {
        name: 'Laos',
        currency: 'LAK',
        language: 'lo',
        iso: 'LA',
      },
      {
        name: 'Lebanon',
        currency: 'LBP',
        language: 'ar',
        iso: 'LB',
      },
      {
        name: 'Saint Lucia',
        currency: 'XCD',
        language: 'en',
        iso: 'LC',
      },
      {
        name: 'Liechtenstein',
        currency: 'CHF',
        language: 'de',
        iso: 'LI',
      },
      {
        name: 'Sri Lanka',
        currency: 'LKR',
        language: 'si',
        iso: 'LK',
      },
      {
        name: 'Liberia',
        currency: 'LRD',
        language: 'en',
        iso: 'LR',
      },
      {
        name: 'Lesotho',
        currency: 'LSL',
        language: 'en',
        iso: 'LS',
      },
      {
        name: 'Lithuania',
        currency: 'EUR',
        language: 'lt',
        iso: 'LT',
      },
      {
        name: 'Luxembourg',
        currency: 'EUR',
        language: 'fr',
        iso: 'LU',
      },
      {
        name: 'Latvia',
        currency: 'EUR',
        language: 'lv',
        iso: 'LV',
      },
      {
        name: 'Libya',
        currency: 'LYD',
        language: 'ar',
        iso: 'LY',
      },
      {
        name: 'Morocco',
        currency: 'MAD',
        language: 'ar',
        iso: 'MA',
      },
      {
        name: 'Monaco',
        currency: 'EUR',
        language: 'fr',
        iso: 'MC',
      },
      {
        name: 'Moldova',
        currency: 'MDL',
        language: 'ro',
        iso: 'MD',
      },
      {
        name: 'Montenegro',
        currency: 'EUR',
        language: 'sr',
        iso: 'ME',
      },
      {
        name: 'Saint Martin',
        currency: 'EUR',
        language: 'en',
        iso: 'MF',
      },
      {
        name: 'Madagascar',
        currency: 'MGA',
        language: 'fr',
        iso: 'MG',
      },
      {
        name: 'Marshall Islands',
        currency: 'USD',
        language: 'en',
        iso: 'MH',
      },
      {
        name: 'North Macedonia',
        currency: 'MKD',
        language: 'mk',
        iso: 'MK',
      },
      {
        name: 'Mali',
        currency: 'XOF',
        language: 'fr',
        iso: 'ML',
      },
      {
        name: 'Myanmar [Burma]',
        currency: 'MMK',
        language: 'my',
        iso: 'MM',
      },
      {
        name: 'Mongolia',
        currency: 'MNT',
        language: 'mn',
        iso: 'MN',
      },
      {
        name: 'Macao',
        currency: 'MOP',
        language: 'zh',
        iso: 'MO',
      },
      {
        name: 'Northern Mariana Islands',
        currency: 'USD',
        language: 'en',
        iso: 'MP',
      },
      {
        name: 'Martinique',
        currency: 'EUR',
        language: 'fr',
        iso: 'MQ',
      },
      {
        name: 'Mauritania',
        currency: 'MRU',
        language: 'ar',
        iso: 'MR',
      },
      {
        name: 'Montserrat',
        currency: 'XCD',
        language: 'en',
        iso: 'MS',
      },
      {
        name: 'Malta',
        currency: 'EUR',
        language: 'mt',
        iso: 'MT',
      },
      {
        name: 'Mauritius',
        currency: 'MUR',
        language: 'en',
        iso: 'MU',
      },
      {
        name: 'Maldives',
        currency: 'MVR',
        language: 'dv',
        iso: 'MV',
      },
      {
        name: 'Malawi',
        currency: 'MWK',
        language: 'en',
        iso: 'MW',
      },
      {
        name: 'Mexico',
        currency: 'MXN',
        language: 'es',
        iso: 'MX',
      },
      {
        name: 'Malaysia',
        currency: 'MYR',
        language: 'ms',
        iso: 'MY',
      },
      {
        name: 'Mozambique',
        currency: 'MZN',
        language: 'pt',
        iso: 'MZ',
      },
      {
        name: 'Namibia',
        currency: 'NAD',
        language: 'en',
        iso: 'NA',
      },
      {
        name: 'New Caledonia',
        currency: 'XPF',
        language: 'fr',
        iso: 'NC',
      },
      {
        name: 'Niger',
        currency: 'XOF',
        language: 'fr',
        iso: 'NE',
      },
      {
        name: 'Norfolk Island',
        currency: 'AUD',
        language: 'en',
        iso: 'NF',
      },
      {
        name: 'Nigeria',
        currency: 'NGN',
        language: 'en',
        iso: 'NG',
      },
      {
        name: 'Nicaragua',
        currency: 'NIO',
        language: 'es',
        iso: 'NI',
      },
      {
        name: 'Netherlands',
        currency: 'EUR',
        language: 'nl',
        iso: 'NL',
      },
      {
        name: 'Norway',
        currency: 'NOK',
        language: 'no',
        iso: 'NO',
      },
      {
        name: 'Nepal',
        currency: 'NPR',
        language: 'ne',
        iso: 'NP',
      },
      {
        name: 'Nauru',
        currency: 'AUD',
        language: 'en',
        iso: 'NR',
      },
      {
        name: 'Niue',
        currency: 'NZD',
        language: 'en',
        iso: 'NU',
      },
      {
        name: 'New Zealand',
        currency: 'NZD',
        language: 'en',
        iso: 'NZ',
      },
      {
        name: 'Oman',
        currency: 'OMR',
        language: 'ar',
        iso: 'OM',
      },
      {
        name: 'Panama',
        currency: 'PAB',
        language: 'es',
        iso: 'PA',
      },
      {
        name: 'Peru',
        currency: 'PEN',
        language: 'es',
        iso: 'PE',
      },
      {
        name: 'French Polynesia',
        currency: 'XPF',
        language: 'fr',
        iso: 'PF',
      },
      {
        name: 'Papua New Guinea',
        currency: 'PGK',
        language: 'en',
        iso: 'PG',
      },
      {
        name: 'Philippines',
        currency: 'PHP',
        language: 'en',
        iso: 'PH',
      },
      {
        name: 'Pakistan',
        currency: 'PKR',
        language: 'en',
        iso: 'PK',
      },
      {
        name: 'Poland',
        currency: 'PLN',
        language: 'pl',
        iso: 'PL',
      },
      {
        name: 'Saint Pierre and Miquelon',
        currency: 'EUR',
        language: 'fr',
        iso: 'PM',
      },
      {
        name: 'Pitcairn Islands',
        currency: 'NZD',
        language: 'en',
        iso: 'PN',
      },
      {
        name: 'Puerto Rico',
        currency: 'USD',
        language: 'es',
        iso: 'PR',
      },
      {
        name: 'Palestine',
        currency: 'ILS',
        language: 'ar',
        iso: 'PS',
      },
      {
        name: 'Portugal',
        currency: 'EUR',
        language: 'pt',
        iso: 'PT',
      },
      {
        name: 'Palau',
        currency: 'USD',
        language: 'en',
        iso: 'PW',
      },
      {
        name: 'Paraguay',
        currency: 'PYG',
        language: 'es',
        iso: 'PY',
      },
      {
        name: 'Qatar',
        currency: 'QAR',
        language: 'ar',
        iso: 'QA',
      },
      {
        name: 'Réunion',
        currency: 'EUR',
        language: 'fr',
        iso: 'RE',
      },
      {
        name: 'Romania',
        currency: 'RON',
        language: 'ro',
        iso: 'RO',
      },
      {
        name: 'Serbia',
        currency: 'RSD',
        language: 'sr',
        iso: 'RS',
      },
      {
        name: 'Russia',
        currency: 'RUB',
        language: 'ru',
        iso: 'RU',
      },
      {
        name: 'Rwanda',
        currency: 'RWF',
        language: 'rw',
        iso: 'RW',
      },
      {
        name: 'Saudi Arabia',
        currency: 'SAR',
        language: 'ar',
        iso: 'SA',
      },
      {
        name: 'Solomon Islands',
        currency: 'SBD',
        language: 'en',
        iso: 'SB',
      },
      {
        name: 'Seychelles',
        currency: 'SCR',
        language: 'fr',
        iso: 'SC',
      },
      {
        name: 'Sudan',
        currency: 'SDG',
        language: 'ar',
        iso: 'SD',
      },
      {
        name: 'Sweden',
        currency: 'SEK',
        language: 'sv',
        iso: 'SE',
      },
      {
        name: 'Singapore',
        currency: 'SGD',
        language: 'en',
        iso: 'SG',
      },
      {
        name: 'Saint Helena',
        currency: 'SHP',
        language: 'en',
        iso: 'SH',
      },
      {
        name: 'Slovenia',
        currency: 'EUR',
        language: 'sl',
        iso: 'SI',
      },
      {
        name: 'Svalbard and Jan Mayen',
        currency: 'NOK',
        language: 'no',
        iso: 'SJ',
      },
      {
        name: 'Slovakia',
        currency: 'EUR',
        language: 'sk',
        iso: 'SK',
      },
      {
        name: 'Sierra Leone',
        currency: 'SLL',
        language: 'en',
        iso: 'SL',
      },
      {
        name: 'San Marino',
        currency: 'EUR',
        language: 'it',
        iso: 'SM',
      },
      {
        name: 'Senegal',
        currency: 'XOF',
        language: 'fr',
        iso: 'SN',
      },
      {
        name: 'Somalia',
        currency: 'SOS',
        language: 'so',
        iso: 'SO',
      },
      {
        name: 'Suriname',
        currency: 'SRD',
        language: 'nl',
        iso: 'SR',
      },
      {
        name: 'South Sudan',
        currency: 'SSP',
        language: 'en',
        iso: 'SS',
      },
      {
        name: 'São Tomé and Príncipe',
        currency: 'STN',
        language: 'pt',
        iso: 'ST',
      },
      {
        name: 'El Salvador',
        currency: 'SVC',
        language: 'es',
        iso: 'SV',
      },
      {
        name: 'Sint Maarten',
        currency: 'ANG',
        language: 'nl',
        iso: 'SX',
      },
      {
        name: 'Syria',
        currency: 'SYP',
        language: 'ar',
        iso: 'SY',
      },
      {
        name: 'Swaziland',
        currency: 'SZL',
        language: 'en',
        iso: 'SZ',
      },
      {
        name: 'Turks and Caicos Islands',
        currency: 'USD',
        language: 'en',
        iso: 'TC',
      },
      {
        name: 'Chad',
        currency: 'XAF',
        language: 'fr',
        iso: 'TD',
      },
      {
        name: 'French Southern Territories',
        currency: 'EUR',
        language: 'fr',
        iso: 'TF',
      },
      {
        name: 'Togo',
        currency: 'XOF',
        language: 'fr',
        iso: 'TG',
      },
      {
        name: 'Thailand',
        currency: 'THB',
        language: 'th',
        iso: 'TH',
      },
      {
        name: 'Tajikistan',
        currency: 'TJS',
        language: 'tg',
        iso: 'TJ',
      },
      {
        name: 'Tokelau',
        currency: 'NZD',
        language: 'en',
        iso: 'TK',
      },
      {
        name: 'East Timor',
        currency: 'USD',
        language: 'pt',
        iso: 'TL',
      },
      {
        name: 'Turkmenistan',
        currency: 'TMT',
        language: 'tk',
        iso: 'TM',
      },
      {
        name: 'Tunisia',
        currency: 'TND',
        language: 'ar',
        iso: 'TN',
      },
      {
        name: 'Tonga',
        currency: 'TOP',
        language: 'en',
        iso: 'TO',
      },
      {
        name: 'Turkey',
        currency: 'TRY',
        language: 'tr',
        iso: 'TR',
      },
      {
        name: 'Trinidad and Tobago',
        currency: 'TTD',
        language: 'en',
        iso: 'TT',
      },
      {
        name: 'Tuvalu',
        currency: 'AUD',
        language: 'en',
        iso: 'TV',
      },
      {
        name: 'Taiwan',
        currency: 'TWD',
        language: 'zh',
        iso: 'TW',
      },
      {
        name: 'Tanzania',
        currency: 'TZS',
        language: 'sw',
        iso: 'TZ',
      },
      {
        name: 'Ukraine',
        currency: 'UAH',
        language: 'uk',
        iso: 'UA',
      },
      {
        name: 'Uganda',
        currency: 'UGX',
        language: 'en',
        iso: 'UG',
      },
      {
        name: 'U.S. Minor Outlying Islands',
        currency: 'USD',
        language: 'en',
        iso: 'UM',
      },
      {
        name: 'United States',
        currency: 'USD',
        language: 'en',
        iso: 'US',
      },
      {
        name: 'Uruguay',
        currency: 'UYI',
        language: 'es',
        iso: 'UY',
      },
      {
        name: 'Uzbekistan',
        currency: 'UZS',
        language: 'uz',
        iso: 'UZ',
      },
      {
        name: 'Vatican City',
        currency: 'EUR',
        language: 'it',
        iso: 'VA',
      },
      {
        name: 'Saint Vincent and the Grenadines',
        currency: 'XCD',
        language: 'en',
        iso: 'VC',
      },
      {
        name: 'Venezuela',
        currency: 'VES',
        language: 'es',
        iso: 'VE',
      },
      {
        name: 'British Virgin Islands',
        currency: 'USD',
        language: 'en',
        iso: 'VG',
      },
      {
        name: 'U.S. Virgin Islands',
        currency: 'USD',
        language: 'en',
        iso: 'VI',
      },
      {
        name: 'Vietnam',
        currency: 'VND',
        language: 'vi',
        iso: 'VN',
      },
      {
        name: 'Vanuatu',
        currency: 'VUV',
        language: 'bi',
        iso: 'VU',
      },
      {
        name: 'Wallis and Futuna',
        currency: 'XPF',
        language: 'fr',
        iso: 'WF',
      },
      {
        name: 'Samoa',
        currency: 'WST',
        language: 'sm',
        iso: 'WS',
      },
      {
        name: 'Kosovo',
        currency: 'EUR',
        language: 'sq',
        iso: 'XK',
      },
      {
        name: 'Yemen',
        currency: 'YER',
        language: 'ar',
        iso: 'YE',
      },
      {
        name: 'Mayotte',
        currency: 'EUR',
        language: 'fr',
        iso: 'YT',
      },
      {
        name: 'South Africa',
        currency: 'ZAR',
        language: 'af',
        iso: 'ZA',
      },
      {
        name: 'Zambia',
        currency: 'ZMW',
        language: 'en',
        iso: 'ZM',
      },
      {
        name: 'Zimbabwe',
        currency: 'USD',
        language: 'en',
        iso: 'ZW',
      },
    ];


    const seeds = countries.map((country) => {
      const {
        name, currency, language, iso,
      } = country;

      const query = `
        INSERT INTO country(name, currency, language, iso) VALUES ($1, $2, $3, $4);
      `;

      return pg.query(query, [name, currency, language, iso], { queryId: 'Migration.CountrySeeds' });
    });

    await Promise.all(seeds);
  }
}

export default CountrySeeds;
