const fs = require('fs');
const path = require('path');
const { withAndroidManifest } = require('@expo/config-plugins');

const NETWORK_SECURITY_CONFIG_XML = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="false">localhost</domain>
        <domain includeSubdomains="false">127.0.0.1</domain>
        <domain includeSubdomains="false">10.0.2.2</domain>
        <domain includeSubdomains="true">10.0.0.0/8</domain>
        <domain includeSubdomains="true">172.16.0.0/12</domain>
        <domain includeSubdomains="true">192.168.0.0/16</domain>
    </domain-config>
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
`;

module.exports = function withLocalCleartext(config) {
  const writeResource = (cfg) => {
    const projectRoot = cfg.modRequest?.projectDir || process.cwd();
    const resDir = path.join(projectRoot, 'android/app/src/main/res/xml');
    try {
      fs.mkdirSync(resDir, { recursive: true });
      fs.writeFileSync(path.join(resDir, 'network_security_config.xml'), NETWORK_SECURITY_CONFIG_XML);
    } catch (e) {
      console.warn('[withLocalCleartext]', e.message);
    }
    return cfg;
  };

  return withAndroidManifest(config, (cfg) => {
    const application = cfg.modResults.manifest.application[0];
    delete application.$['android:usesCleartextTraffic'];
    application.$['android:networkSecurityConfig'] = '@xml/network_security_config';
    return writeResource(cfg);
  });
};