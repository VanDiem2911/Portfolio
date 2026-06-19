export default function BrandLogo({ className = '', imageClassName = 'h-[64px]' }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src="/images/logo-pham-thi-thu.png"
        alt="Phạm Thị Thu — Financial Advisor"
        className={`${imageClassName} w-auto shrink-0 object-contain transition-all duration-300 group-hover:scale-[1.03]`}
      />
    </span>
  );
}
