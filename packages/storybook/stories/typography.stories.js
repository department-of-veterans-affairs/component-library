export default {
  title: 'Typography',
};

export const Default = () => {
  const sample = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const fonts = [
    { name: 'Sans', classPrefix: 'vads-u-font--sans-' },
    { name: 'Mono', classPrefix: 'vads-u-font--mono-' },
    { name: 'Serif', classPrefix: 'vads-u-font--serif-' },
  ];
  return (
    <>
      {sizes.map((size) => (
        <table key={size} style={{ marginBottom: '2rem', borderCollapse: 'collapse', width: '240px' }}>
          <thead>
            <tr>
              {fonts.map((font) => (
                <th key={font.name} style={{ border: '1px solid #ccc', padding: '4px' }}>{font.name} {size}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sample.map((char, i) => (
              <tr key={char + i}>
                {fonts.map((font) => (
                  <td key={font.name} style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>
                    <span className={`${font.classPrefix}${size}`}>{char}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}

      {['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
        <div key={size} className="vads-u-margin-y--2" style={{ borderTop: `1px solid black`, borderBottom: `1px solid black` }}>
          <span className={`vads-u-font--sans-${size}`}>Font size sans {size}, </span>
          <span className={`vads-u-font--mono-${size}`}>Font size mono {size}, </span>
          <span className={`vads-u-font--serif-${size}`}>Font size serif {size} </span>
        </div>
      ))}
    </>
  );
};